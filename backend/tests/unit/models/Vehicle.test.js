import { describe, it, expect } from 'vitest';
import Vehicle from '../../../models/Vehicle';
import pool from '../../../config/db';

describe('Modèle Vehicle', () => {
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

    // Nettoyage
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
  });

  it('doit rejeter une création invalide', async () => {
    // Arrange
    const invalidVehicle = { make: 'Incomplete' };

    // Act & Assert
    await expect(Vehicle.create(invalidVehicle)).rejects.toThrow();
  });
});