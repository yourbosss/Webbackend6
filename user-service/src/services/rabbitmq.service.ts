import amqp from 'amqplib';

class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect(url: string) {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
  }

  async publish(queue: string, message: object) {
    if (!this.channel) throw new Error('Channel not initialized');
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  async consume(queue: string, onMessage: (msg: amqp.ConsumeMessage | null) => void) {
    if (!this.channel) throw new Error('Channel not initialized');
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.consume(queue, onMessage, { noAck: false });
  }

  async close() {
    await this.channel?.close();
    await this.connection?.close();
  }
}

export const rabbitMQService = new RabbitMQService();
