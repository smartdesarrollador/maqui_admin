<?php

declare(strict_types=1);

namespace App\Http\Controllers\motos;

use App\Http\Controllers\Controller;
use App\Models\Modelo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class ModeloController extends Controller
{
    /**
     * Obtiene todos los modelos de motos
     */
    public function index(): JsonResponse
    {
        try {
            $modelos = Modelo::with(['marca', 'motos'])->get();
            return response()->json($modelos, 200);
        } catch (Exception $e) {
            Log::error('Error al obtener modelos: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacena un nuevo modelo de moto
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'marca_id' => 'required|exists:marcas,id_marca',
                'nombre' => 'required|string|max:255',
                'tipo' => 'required|string|max:100',
                'cilindrada' => 'required|string|max:50',
                'imagen' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $modelo = Modelo::create($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Modelo creado exitosamente',
                'data' => $modelo
            ], 201);
        } catch (Exception $e) {
            Log::error('Error al crear modelo: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al crear el modelo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtiene un modelo específico
     */
    public function show(int $id): JsonResponse
    {
        try {
            $modelo = Modelo::with(['marca', 'motos'])
                ->findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Modelo obtenido exitosamente',
                'data' => $modelo
            ], 200);
        } catch (Exception $e) {
            Log::error('Error al obtener modelo: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Modelo no encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Actualiza un modelo específico
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $modelo = Modelo::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'marca_id' => 'sometimes|exists:marcas,id_marca',
                'nombre' => 'sometimes|string|max:255',
                'tipo' => 'sometimes|string|max:100',
                'cilindrada' => 'sometimes|string|max:50',
                'imagen' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $modelo->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Modelo actualizado exitosamente',
                'data' => $modelo
            ], 200);
        } catch (Exception $e) {
            Log::error('Error al actualizar modelo: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar el modelo',
                'error' => $e->getMessage()
            ], $e instanceof ModelNotFoundException ? 404 : 500);
        }
    }

    /**
     * Elimina un modelo específico
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $modelo = Modelo::findOrFail($id);
            
            // Verificar si tiene motos asociadas
            if ($modelo->motos()->exists()) {
                return response()->json([
                    'status' => false,
                    'message' => 'No se puede eliminar el modelo porque tiene motos asociadas'
                ], 409);
            }

            $modelo->delete();

            return response()->json([
                'status' => true,
                'message' => 'Modelo eliminado exitosamente'
            ], 200);
        } catch (Exception $e) {
            Log::error('Error al eliminar modelo: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar el modelo',
                'error' => $e->getMessage()
            ], $e instanceof ModelNotFoundException ? 404 : 500);
        }
    }
}
