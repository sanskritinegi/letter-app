export interface RecipientAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
}

export interface RecipientSender {
  name: string
  address: RecipientAddress
}

export interface LetterContent {
  date: string
  greeting: string
  paragraphs: string[]
  closing: string
  signature: string
}

export interface Recipient {
  id: string
  slug: string
  secure_slug: string
  name: string
  address: RecipientAddress
  description?: string
  sender: RecipientSender
  letter: LetterContent
}

export interface Letter {
  id: string
  slug: string
  secure_slug: string
  recipient_name: string
  recipient_description: string
  sender_name: string
  letter_date: string
  greeting: string
  content: string[]
  closing: string
  signature: string
}

export function getLetterBySlug(slug: string): Letter | undefined {
  return lettersData.find((letter) => letter.slug === slug)
}

export function getLetterBySecureSlug(secureSlug: string): Letter | undefined {
  return lettersData.find((letter) => letter.secure_slug === secureSlug)
}

export function getAllLetters(): Letter[] {
  return lettersData
}

// Update the lettersData array to remove Rafi, Anand, Vishal, and Puru
// Keep only Rebecca, Michael, Sarah, Arvind, and Jane

const lettersData: Letter[] = [
  {
    id: "1",
    slug: "rebecca",
    secure_slug: "rebecca-secure",
    recipient_name: "MS. REBECCA SMITH",
    recipient_description: "123 MAIN STREET, ANCHORAGE, AK 99501, USA",
    sender_name: "MS. JANE H. DOE",
    letter_date: "2025-03-18",
    greeting: "Dear Friend,",
    content: [
      "I hope this letter finds you well. I wanted to take a moment to share some thoughts with you.",
      "Life is a journey filled with unexpected twists and turns. Sometimes we find ourselves on paths we never imagined, meeting people who change our lives in ways we could never predict.",
      "I'm grateful that our paths have crossed, and I look forward to the adventures that lie ahead.",
      "The world is full of possibilities, and I believe that with courage and determination, we can achieve anything we set our minds to.",
      "Remember to take time for yourself, to appreciate the small moments, and to cherish the connections you make along the way.",
    ],
    closing: "Warmest regards,",
    signature: "Your Friend",
  },
  {
    id: "2",
    slug: "michael",
    secure_slug: "michael-secure",
    recipient_name: "MR. MICHAEL JOHNSON",
    recipient_description: "456 PARK AVENUE, APT 789, NEW YORK, NY 10022, USA",
    sender_name: "MS. JANE H. DOE",
    letter_date: "2025-03-20",
    greeting: "Dear Michael,",
    content: [
      "I hope this letter finds you in good health and high spirits. It's been too long since we last spoke.",
      "I've been thinking about our last conversation about your new business venture. Your passion and dedication are truly inspiring, and I have no doubt that you will succeed in this new chapter of your life.",
      "Remember when we talked about taking risks and stepping outside of our comfort zones? Well, I've finally taken your advice and started that painting class I've been talking about for years. It's challenging but incredibly rewarding.",
      "I'd love to hear how things are progressing with your projects. Perhaps we could schedule a call soon to catch up properly.",
      "Until then, take care of yourself and don't work too hard. Life is about balance, after all.",
    ],
    closing: "With warm regards,",
    signature: "Jane",
  },
  {
    id: "3",
    slug: "sarah",
    secure_slug: "sarah-secure",
    recipient_name: "MS. SARAH WILLIAMS",
    recipient_description: "789 OCEAN DRIVE, MIAMI, FL 33139, USA",
    sender_name: "MS. JANE H. DOE",
    letter_date: "2025-03-22",
    greeting: "Dearest Sarah,",
    content: [
      "I hope this letter brings a smile to your face. I was reminiscing about our college days and felt compelled to write to you.",
      "Do you remember that road trip we took during spring break? The car breaking down in the middle of nowhere, and how we ended up having the most amazing adventure despite the setback? Those memories still make me laugh.",
      "Life has been quite the journey since then. I've been focusing on my garden lately - you'd be proud of how my roses have bloomed this year. I remember how you always had a green thumb.",
      "I saw a book the other day that reminded me of you - it was about sustainable architecture, your passion project in college. Have you continued pursuing that interest?",
      "I hope your family is doing well. Please give my love to everyone, and know that you're often in my thoughts even though miles separate us.",
    ],
    closing: "With love and fond memories,",
    signature: "Jane",
  },
  {
    id: "6",
    slug: "arvind",
    secure_slug: "arvind230843",
    recipient_name: "ARVIND",
    recipient_description: "PARTNERSHIPS EXPERT, SAILING ENTHUSIAST",
    sender_name: "FROM PUSHOWL",
    letter_date: "2025-03-19",
    greeting: "Dear Arvind,",
    content: [
      "I'll just lie and say I'll miss you, haha! No but really, it's been really fun working with you. Every trip was incomplete without our banter!",
      "I hope we meet soon, and I think you should give up partnerships and become a sailing influencer already. Your stories about sailing adventures always made me want to try it someday.",
      "Anyway, I'll always be grateful for your guidance and support, it means a lot. Your insights and advice have helped me navigate many challenging situations at work.",
      "Hope we cross paths soon. The office won't be the same without our daily debates and discussions that somehow always ended in laughter.",
      "P.S. Have the virtual gulab jamuns haha!",
    ],
    closing: "Until we meet again,",
    signature: "Your favorite debate partner",
  },
  {
    id: "9",
    slug: "jane",
    secure_slug: "jane123456",
    recipient_name: "JANE",
    recipient_description: "MENTOR & FRIEND",
    sender_name: "FROM SANSKRITI",
    letter_date: "2025-03-22",
    greeting: "Dear Jane,",
    content: [
      "I wanted to take a moment to express my gratitude for all the support and guidance you've provided during my time at the company. Your mentorship has been invaluable to my professional growth.",
      "Remember that project we worked on last summer? Your creative approach to problem-solving completely changed how I think about design challenges. I still use those techniques in my work today!",
      "I've always admired your ability to balance professionalism with genuine warmth. The way you lead your team with both empathy and efficiency is something I aspire to emulate in my own career.",
      "Our coffee chats and brainstorming sessions were highlights of my week. Your insights always helped me see things from new perspectives, and your encouragement gave me confidence when I needed it most.",
      "As I move on to new adventures, I'll carry the lessons you've taught me. Thank you for being not just a colleague, but a true mentor and friend.",
    ],
    closing: "With sincere appreciation,",
    signature: "Sanskriti",
  },
]
