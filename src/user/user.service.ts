import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  private readonly knex: Knex;

  constructor(@InjectModel() knex: Knex) {
    this.knex = knex;
  }

  encryptData(data: string, public_key: string) {
    // Generate a random AES key
    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // Encrypt the data with the AES key
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    // Encrypt the AES key with the RSA public key
    const encryptedKey = crypto.publicEncrypt(public_key, Buffer.from(aesKey));

    // Return the encrypted key and the encrypted data
    return {
      iv: iv,
      encryptedKey: encryptedKey,
      data: encryptedData,
    };
  }

  async findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.knex('applicants').where({ id }).first();
      if (!user) {
        throw new Error('User not found');
      }
      const response = {
        email: user.email,
        display_name: user.display_name,
        status: user.status,
        terms_of_service_opt_in: user.terms_of_service_opt_in,
        terms_version: user.terms_version,
        privacy_opt_in: user.privacy_opt_in,
        privacy_version: user.privacy_version,
        last_login: user.last_login,
        url_hash: user.url_hash,
      };

      const public_key = user.public_key

      const encryptedResponse: any = this.encryptData(JSON.stringify(response), public_key);

      return encryptedResponse;
    } catch (error) {
      console.error(`Failed to find user with id ${id}: ${error.message}`);
      throw error;
    }
  }
}
