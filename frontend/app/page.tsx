import FacultyCard from "@/components/FacultyCard";

const faculties = [
  { name: "Gryffindor", path: "/faculties/gryffindor" },
  { name: "Slytherin", path: "/faculties/slytherin" },
  { name: "Ravenclaw", path: "/faculties/ravenclaw" },
  { name: "Hufflepuff", path: "/faculties/hufflepuff" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hogwarts Faculties
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {faculties.map(f => (
          <FacultyCard key={f.name} {...f} />
        ))}
      </div>
    </main>
  );
}
