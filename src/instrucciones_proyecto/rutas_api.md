// Rutas para clientes
Route::get('clientes', [clientesController::class, 'index']);
Route::get('clientes/{id}', [clientesController::class, 'show']);
Route::post('clientes', [clientesController::class, 'store']);
Route::put('clientes/{id}', [clientesController::class, 'update']);
Route::delete('clientes/{id}', [clientesController::class, 'destroy']);

// Rutas para tipos de motos
Route::get('tipos-motos', [TipoMotoController::class, 'index']);
Route::get('tipos-motos/{id}', [TipoMotoController::class, 'show']);
Route::post('tipos-motos', [TipoMotoController::class, 'store']);
Route::put('tipos-motos/{id}', [TipoMotoController::class, 'update']);
Route::delete('tipos-motos/{id}', [TipoMotoController::class, 'destroy']);

// Rutas para motos
Route::get('motos', [MotoController::class, 'index']);
Route::get('motos/{id}', [MotoController::class, 'show']);
Route::post('motos', [MotoController::class, 'store']);
Route::put('motos/{id}', [MotoController::class, 'update']);
Route::delete('motos/{id}', [MotoController::class, 'destroy']);

// Rutas para modelos
Route::get('modelos', [ModeloController::class, 'index']);
Route::get('modelos/{id}', [ModeloController::class, 'show']);
Route::post('modelos', [ModeloController::class, 'store']);
Route::put('modelos/{id}', [ModeloController::class, 'update']);
Route::delete('modelos/{id}', [ModeloController::class, 'destroy']);
