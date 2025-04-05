import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    
    const sampleUser = new User({
      username: 'test',
      password: 'test123'
    });
    
    await sampleUser.save();
    return NextResponse.json({ success: true, message: 'Sample user created successfully' });
    
  } catch (error) {
    console.error('Sample user creation error:', error);
    if (error.code === 11000) { // Duplicate key error
      return NextResponse.json(
        { success: false, message: 'Sample user already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}