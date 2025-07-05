import { describe, it, expect, afterEach } from 'vitest';
import Vehicle from '../../../models/Vehicle.js'; // ← Assure-toi que l'extension .js est bien là si tu utilises ES Modules
import pool from '../../../config/db.js';         // ← Idem ici

describe('Modèle Vehicle', () => {
  afterEach(async () => {
    // Nettoyage après chaque test pour éviter les conflits
    await pool.query('DELETE FROM vehicles WHERE registrationNumber = ?', ['TEST123']);
  });

  it('doit créer un véhicule', async () => {
    // Arrange
    const mockVehicle = {
      registrationNumber: 'TEST123',
      make: 'Test',
      model: 'Model',
      year: 2023,
      rentalPrice: 100
    };

    // Act
    const id = await Vehicle.create(mockVehicle);

    // Assert
    expect(id).toBeDefined();
    expect(typeof id).toBe('number');
  });

  it('doit rejeter une création invalide', async () => {
    // Arrange
    const invalidVehicle = { make: 'Incomplete' };

    // Act & Assert
    await expect(Vehicle.create(invalidVehicle)).rejects.toThrow();
  });
});
