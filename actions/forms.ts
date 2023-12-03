"use server"

import prismadb from "@/lib/prismadb";
import { formSchema, storeFormSchemaType } from "@/schemas/store-form";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


class UserNotFoundErr extends Error {}
export async function CreateStoreForm(data: storeFormSchemaType) {
    const validation = formSchema.safeParse(data)
    if (!validation.success) {
        throw new Error("Form not valid")
    }

    const { name } = data

    const { userId } = auth()
    if (!userId) {
        // throw new UserNotFoundErr()
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!name) {
        return new NextResponse("Name is required", { status: 400 })
    }

    const store = await prismadb.store.create({
        data: {
            name,
            userId
        }
    })

    return NextResponse.json(store)
}