import EnvelopeLetter from "@/components/envelope-letter"

export default function Envelope() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <EnvelopeLetter
          recipient={{
            id: "1",
            slug: "john-doe",
            secure_slug: "secure-john-doe",
            name: "John Doe",
            address: {
              line1: "123 Main St",
              city: "Metropolis",
              state: "NY",
              zip: "12345",
              country: "USA"
            },
            sender: {
              name: "Jane Smith",
              address: {
                line1: "456 Side St",
                city: "Gotham",
                state: "NY",
                zip: "67890",
                country: "USA"
              }
            },
            letter: {
              date: "2024-01-01",
              greeting: "Dear John",
              paragraphs: ["Hello John, this is your letter!"],
              closing: "Sincerely",
              signature: "Jane"
            }
          }}
        />
      </div>
    </div>
  )
}
