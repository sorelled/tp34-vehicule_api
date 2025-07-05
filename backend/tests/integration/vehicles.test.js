import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app';
import pool from '../../config/db';

describe('API Véhicules (Intégration)', () => {
  let testVehicleId;
  let authToken;

  beforeAll(async () => {
    // Arrange: Créer un utilisateur de test et obtenir un token
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test',
        email: 'test@vehicles.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@vehicles.com',
        password: 'password123'
      });

    authToken = res.body.token;
  });

  it('POST /vehicles - Créer un véhicule', async () => {
    // Arrange
    const vehicleData = {
      registrationNumber: 'TEST001',
      make: 'Toyota',
      model: 'Corolla',
      year: 2023,
      rentalPrice: 50
    };

    // Act
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${authToken}`)
      .send(vehicleData);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    testVehicleId = res.body.id;
  });

  it('GET /vehicles - Récupérer tous les véhicules', async () => {
    // Act
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /vehicles/:id - Récupérer un véhicule par ID', async () => {
    // Act
    const res = await request(app)
      .get(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', testVehicleId);
  });

  it('PUT /vehicles/:id - Mettre à jour un véhicule', async () => {
    // Arrange
    const updateData = { rentalPrice: 60 };

    // Act
    const res = await request(app)
      .put(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('rentalPrice', 60);
  });

  it('DELETE /vehicles/:id - Supprimer un véhicule', async () => {
    // Act
    const res = await request(app)
      .delete(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`);

    // Assert
    expect(res.status).toBe(204);
  });

  afterAll(async () => {
    // Nettoyage : supprimer l'utilisateur de test et fermer la connexion à la base
    await pool.query('DELETE FROM users WHERE email = ?', ['test@vehicles.com']);
    await pool.end();
  });
});