import * as amqp from 'amqplib/callback_api'; // Изменён импорт

export class Rabbit {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  async connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect(url, (err, conn) => {
        if (err) {
          return reject(err);
        }
        this.connection = conn;
        this.connection.createChannel((err, ch) => {
          if (err) {
            return reject(err);
          }
          this.channel = ch;
          resolve();
        });
      });
    });
  }

  async publishRegistration(data: { userId: string; courseId: string }): Promise<void> {
    const queue = 'registration_queue';
    await new Promise<void>((resolve, reject) => {
      this.channel.assertQueue(queue, { durable: true }, (err) => {
        if (err) {
          return reject(err);
        }
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
        resolve();
      });
    });
  }

  async close(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.channel.close((err) => {
        if (err) {
          return reject(err);
        }
        this.connection.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
}