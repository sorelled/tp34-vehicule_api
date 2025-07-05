import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../app';
import pool from '../../config/db';
/**
 * Tests End-to-End (E2E) - Flux complet de l'API
 * 
 * Ces tests vérifient le bon enchaînement des opérations :
 * 1. Création utilisateur
 * 2. Authentification
 * 3. CRUD véhicules
 * 4. Gestion des erreurs
 */
describe('Flux complet API (E2E)', () => {
  let authToken;
  let testVehicleId;
  const testUser = {
    name: 'Test E2E',
    email: 'e2e@test.com',
    password: 'password123'
  };

  // Nettoyage avant/après les tests
  beforeAll(async () => {
    await pool.query('DELETE FROM users WHERE email = ?', [testUser.email]);
  });

  afterAll(async () => {
    if (testVehicleId) {
      await pool.query('DELETE FROM vehicles WHERE id = ?', [testVehicleId]);
    }
    await pool.query('DELETE FROM users WHERE email = ?', [testUser.email]);
    await pool.end();
  });

  /**
   * Test complet :
   * 1. Enregistrement utilisateur
   * 2. Connexion
   * 3. Création véhicule
   * 4. Lecture véhicule
   * 5. Mise à jour
   * 6. Suppression
   */
  it('Devrait compléter un cycle CRUD complet', async () => {
    // [1] Enregistrement utilisateur
    const registerRes = await request(app)
      .post('/api/users/register')
      .send(testUser);

    expect(registerRes.status).toBe(201);
    expect(registerRes.body).toHaveProperty('user.id');

    // [2] Connexion
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
    authToken = loginRes.body.token;

    // [3] Création véhicule
    const vehicleData = {
      registrationNumber: 'E2E-001',
      make: 'Toyota',
      model: 'Corolla',
      year: 2023,
      rentalPrice: 50
    };

    const createRes = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${authToken}`)
      .send(vehicleData);

    expect(createRes.status).toBe(201);
    testVehicleId = createRes.body.id;

    // [4] Lecture véhicule
    const getRes = await request(app)
      .get(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body).toMatchObject(vehicleData);

    // [5] Mise à jour
    const updateRes = await request(app)
      .put(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ rentalPrice: 55 });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.rentalPrice).toBe(55);

    // [6] Suppression
    const deleteRes = await request(app)
      .delete(`/api/vehicles/${testVehicleId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(204);
    testVehicleId = null; // Empêche le nettoyage inutile
  });

  /**
   * Test des erreurs
   */
  it('Devrait gérer les erreurs d\'authentification', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', 'Bearer token_invalide');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});