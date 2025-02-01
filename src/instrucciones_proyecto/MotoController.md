<?php

namespace App\Http\Controllers\motos;

use App\Http\Controllers\Controller;
use App\Models\Moto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MotoController extends Controller
{
    /**
     * Obtener listado de motos con paginación
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            // Validar parámetros de paginación y ordenamiento
            $validator = Validator::make($request->all(), [
                'per_page' => 'integer|min:1|max:100',
                'page' => 'integer|min:1',
                'order_by' => 'string|in:año,precio_base,created_at',
                'order_direction' => 'string|in:asc,desc'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], 422);
            }

            // Construir la consulta base
            $query = Moto::with(['modelo.marca', 'tipoMoto']);

            // Aplicar búsqueda si existe término
            if ($request->has('search')) {
                $searchTerm = $request->search;
                $query->where(function($q) use ($searchTerm) {
                    $q->where('color', 'LIKE', "%{$searchTerm}%")
                      ->orWhere('descripcion', 'LIKE', "%{$searchTerm}%")
                      ->orWhere('cilindrada', 'LIKE', "%{$searchTerm}%")
                      ->orWhere('motor', 'LIKE', "%{$searchTerm}%")
                      ->orWhereHas('modelo', function($q) use ($searchTerm) {
                          $q->where('nombre', 'LIKE', "%{$searchTerm}%");
                      })
                      ->orWhereHas('modelo.marca', function($q) use ($searchTerm) {
                          $q->where('nombre', 'LIKE', "%{$searchTerm}%");
                      });
                });
            }

            // Aplicar filtros adicionales
            if ($request->has('año')) {
                $query->where('año', $request->año);
            }

            if ($request->has('precio_min')) {
                $query->where('precio_base', '>=', $request->precio_min);
            }

            if ($request->has('precio_max')) {
                $query->where('precio_base', '<=', $request->precio_max);
            }

            if ($request->has('tipo_moto_id')) {
                $query->where('tipo_moto_id', $request->tipo_moto_id);
            }

            // Aplicar ordenamiento
            $orderBy = $request->get('order_by', 'created_at');
            $orderDirection = $request->get('order_direction', 'desc');
            $query->orderBy($orderBy, $orderDirection);

            // Ejecutar paginación
            $motos = $query->paginate($request->get('per_page', 10));

            return response()->json($motos, 200);

        } catch (\Exception $e) {
            Log::error('Error al obtener motos: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Almacenar una nueva moto
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'modelo_id' => 'required|exists:modelos,id_modelo',
                'tipo_moto_id' => 'required|exists:tipo_motos,id_tipo_moto',
                'año' => 'required|integer',
                'precio_base' => 'required|numeric',
                'color' => 'required|string',
                'stock' => 'required|integer',
                'descripcion' => 'required|string',
                'imagen' => 'required|string',
                'cilindrada' => 'required|string',
                'motor' => 'required|string',
                'potencia' => 'required|string',
                'arranque' => 'required|string',
                'transmision' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();
            
            $moto = Moto::create($request->all());
            
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Moto creada exitosamente',
                'data' => $moto
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al crear moto: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al crear la moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener una moto específica
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $moto = Moto::with([
                'modelo.marca', 
                'tipoMoto',
                'accesorios',
                'repuestos'
            ])->findOrFail($id);

            return response()->json([
                'status' => true,
                'message' => 'Moto obtenida exitosamente',
                'data' => $moto
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al obtener moto: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al obtener la moto',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Actualizar una moto específica
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'modelo_id' => 'exists:modelos,id_modelo',
                'tipo_moto_id' => 'exists:tipo_motos,id_tipo_moto',
                'año' => 'integer',
                'precio_base' => 'numeric',
                'color' => 'string',
                'stock' => 'integer',
                'descripcion' => 'string',
                'imagen' => 'string',
                'cilindrada' => 'string',
                'motor' => 'string',
                'potencia' => 'string',
                'arranque' => 'string',
                'transmision' => 'string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $moto = Moto::findOrFail($id);
            $moto->update($request->all());

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Moto actualizada exitosamente',
                'data' => $moto
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al actualizar moto: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar la moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar una moto específica
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $moto = Moto::findOrFail($id);
            $moto->delete();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Moto eliminada exitosamente'
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al eliminar moto: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar la moto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
