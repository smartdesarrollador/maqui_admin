// Rutas para motos
Route::get('motos', [MotoController::class, 'index']);
Route::get('motos/{id}', [MotoController::class, 'show']);
Route::post('motos', [MotoController::class, 'store']);
Route::put('motos/{id}', [MotoController::class, 'update']);
Route::delete('motos/{id}', [MotoController::class, 'destroy']);
