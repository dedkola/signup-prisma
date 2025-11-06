import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Valid email is required", error: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address",
          error: "INVALID_EMAIL",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "An account with this email already exists",
          error: "USER_EXISTS",
        },
        { status: 409 }
      );
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name && typeof name === "string" ? name.trim() : null,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json(
      {
        message: "Account created successfully!",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle Prisma unique constraint error
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "An account with this email already exists",
          error: "USER_EXISTS",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create account. Please try again.",
        error: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
