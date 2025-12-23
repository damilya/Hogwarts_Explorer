const FACULTIES: Record<string, { displayName: string; bgClass: string; description: string; symbol?: string }> = {
  gryffindor: {
    displayName: "Gryffindor",
    bgClass: "bg-red-900 text-white",
    description: "Gryffindor values bravery, daring, nerve, and chivalry.",
    symbol: "🦁",
  },
  slytherin: {
    displayName: "Slytherin",
    bgClass: "bg-green-900 text-white",
    description: "Slytherin values ambition, cunning, leadership, and resourcefulness.",
    symbol: "🐍",
  },
  ravenclaw: {
    displayName: "Ravenclaw",
    bgClass: "bg-blue-900 text-white",
    description: "Ravenclaw values wisdom, intellect, and creativity.",
    symbol: "🦅",
  },
  hufflepuff: {
    displayName: "Hufflepuff",
    bgClass: "bg-amber-400 text-black",
    description: "Hufflepuff values loyalty, patience, and fairness.",
    symbol: "🦡",
  },
};

export default FACULTIES;
