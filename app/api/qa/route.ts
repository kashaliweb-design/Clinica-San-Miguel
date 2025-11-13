import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'qa-database.json')
    
    // Check if file exists, if not generate it
    if (!fs.existsSync(dataPath)) {
      // Generate Q&A database on first request
      const { exec } = require('child_process')
      const scriptPath = path.join(process.cwd(), 'scripts', 'generate-qa.js')
      
      await new Promise((resolve, reject) => {
        exec(`node "${scriptPath}"`, (error: any) => {
          if (error) reject(error)
          else resolve(null)
        })
      })
    }
    
    const data = fs.readFileSync(dataPath, 'utf-8')
    const qaData = JSON.parse(data)
    
    return NextResponse.json(qaData)
  } catch (error) {
    console.error('Error loading Q&A data:', error)
    return NextResponse.json({ error: 'Failed to load Q&A data' }, { status: 500 })
  }
}
