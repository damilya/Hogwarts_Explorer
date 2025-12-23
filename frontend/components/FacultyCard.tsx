import Link from "next/link";

type FacultyCardProps = {
  name: string;
  path: string;
};

export default function FacultyCard({ name, path }: FacultyCardProps) {
  return (
    <Link href={path}>
      <div className="bg-gray-800 hover:bg-gray-700 transition rounded-xl p-6 cursor-pointer shadow-lg">
        <h2 className="text-2xl font-semibold text-center">
          {name}
        </h2>
      </div>
    </Link>
  );
}
