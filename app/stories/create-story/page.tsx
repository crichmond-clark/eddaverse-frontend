import ky from 'ky'
import React, { useRef } from 'react'

export default function CreateStoryPage() {
    const formRef = useRef<HTMLFormElement>(null)
    const createStory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formRef.current) {
            const formData = new FormData(formRef.current)
            const data = Object.fromEntries(formData.entries())

            try {
                const json = await ky
                    .post('/api/v1/stories', { json: { title: data.title } })
                    .json()
            } catch (error) {
                console.log({ message: 'failed request', error: error })
            }
        }
    }
    return (
        <>
            <form ref={formRef} onSubmit={createStory}>
                <input
                    name="title"
                    type="text"
                    placeholder="title"
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}
