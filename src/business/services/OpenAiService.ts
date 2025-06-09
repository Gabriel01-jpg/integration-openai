import OpenAI from 'openai';
export class OpenAiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async transcribeAudio(filePath: string, model: string): Promise<string> {
    try {
      const raw_audio = await fetch(filePath);

      const transcription = await this.openai.audio.transcriptions.create({
        file: raw_audio,
        model: model,
        prompt: 'This is a transcription of an patient audio file.',
      });

      return transcription.text;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async generateSectionG(transcription: string): Promise<string | null> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a medical assistant that helps to generate section G of a patient note.',
          },
          {
            role: 'user',
            content: `Extract section G responses as a plain JSON string (parsable by Node.js), where keys are question codes (e.g., M1800, M1810...) and values are the corresponding numeric responses (e.g., 0, 1, 2). Do not include any markdown formatting or code blocks. Use the following transcription as input: ${transcription}`,
          },
        ],
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error('No response from OpenAI');
      }

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating Section G:', error);
      throw new Error('Failed to generate Section G');
    }
  }
}
