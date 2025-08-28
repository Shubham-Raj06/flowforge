import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  id: String,
  userId: String,
  appspec: Object,
  status: { type: String, enum: ['generating', 'ready', 'deployed'] },
  deployUrl: String,
  githubRepo: String,
  createdAt: { type: Date, default: Date.now },
  metadata: {
    originalPrompt: String,
    agentsUsed: [String],
    generationTime: Number
  }
})

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)

const MONGODB_URI = process.env.MONGODB_URI || ''

export async function connectDB() {
  if (!MONGODB_URI) return
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI)
  }
}


