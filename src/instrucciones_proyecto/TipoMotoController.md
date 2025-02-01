<?php

namespace App\Http\Controllers\motos;

use App\Http\Controllers\Controller;
use App\Models\TipoMoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class TipoMotoController extends Controller
{
    /**
     * Obtener listado de tipos de moto
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $tipoMotos = TipoMoto::with('motos')->get();
            
            return response()->json($tipoMotos, 200);
            
        } catch (\Exception $e) {
            Log::error('Error al obtener tipos de moto: ' . $e->getMessage());
            
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacenar un nuevo tipo de moto
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:255|unique:tipo_motos,nombre',
                'descripcion' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $tipoMoto = TipoMoto::create($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Tipo de moto creado exitosamente',
                'data' => $tipoMoto
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error al crear tipo de moto: ' . $e->getMessage());
            
            return response()->json([
                'status' => false,
                'message' => 'Error al crear el tipo de moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar un tipo de moto específico
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $tipoMoto = TipoMoto::with('motos')->find($id);
            
            if (!$tipoMoto) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tipo de moto no encontrado'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'message' => 'Tipo de moto obtenido exitosamente',
                'data' => $tipoMoto
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al obtener tipo de moto: ' . $e->getMessage());
            
            return response()->json([
                'status' => false,
                'message' => 'Error al obtener el tipo de moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Actualizar un tipo de moto específico
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $tipoMoto = TipoMoto::find($id);
            
            if (!$tipoMoto) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tipo de moto no encontrado'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:255|unique:tipo_motos,nombre,' . $id . ',id_tipo_moto',
                'descripcion' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $tipoMoto->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Tipo de moto actualizado exitosamente',
                'data' => $tipoMoto
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar tipo de moto: ' . $e->getMessage());
            
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar el tipo de moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar un tipo de moto específico
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $tipoMoto = TipoMoto::find($id);
            
            if (!$tipoMoto) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tipo de moto no encontrado'
                ], 404);
            }

            // Verificar si hay motos asociadas
            if ($tipoMoto->motos()->count() > 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'No se puede eliminar el tipo de moto porque tiene motos asociadas'
                ], 409);
            }

            $tipoMoto->delete();

            return response()->json([
                'status' => true,
                'message' => 'Tipo de moto eliminado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar tipo de moto: ' . $e->getMessage());
            
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar el tipo de moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
