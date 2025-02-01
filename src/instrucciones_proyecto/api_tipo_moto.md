// Rutas para tipos de motos
Route::get('tipos-motos', [TipoMotoController::class, 'index']);
Route::get('tipos-motos/{id}', [TipoMotoController::class, 'show']);
Route::post('tipos-motos', [TipoMotoController::class, 'store']);
Route::put('tipos-motos/{id}', [TipoMotoController::class, 'update']);
Route::delete('tipos-motos/{id}', [TipoMotoController::class, 'destroy']);
