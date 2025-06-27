import { useState, useMemo } from "react";
import { Search, Calendar, User, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Researcher {
  id: number;
  name: string;
  description: string;
  publications?: string[];
}

// Extract profession from description
const extractProfession = (description: string): string | null => {
  const professionPatterns = [
    { regex: /software engineer/i, label: "Software Engineer" },
    { regex: /UFO researcher/i, label: "UFO Researcher" },
    { regex: /engineering manager/i, label: "Engineer" },
    { regex: /computer analyst/i, label: "Computer Analyst" },
    { regex: /parapsychologist/i, label: "Parapsychologist" },
    { regex: /conspiracy writer/i, label: "Writer" },
    { regex: /investigative journalist/i, label: "Journalist" },
    { regex: /journalist/i, label: "Journalist" },
    { regex: /physicist/i, label: "Physicist" },
    { regex: /scientist/i, label: "Scientist" },
    { regex: /electronic weapons engineer/i, label: "Engineer" },
    { regex: /systems analyst/i, label: "Systems Analyst" },
    { regex: /atmospheric physicist/i, label: "Physicist" },
    { regex: /author/i, label: "Author" },
    { regex: /psychiatrist/i, label: "Psychiatrist" },
    { regex: /air force sergeant/i, label: "Military" },
    { regex: /aerospace illustrator/i, label: "Illustrator" },
    { regex: /computer scientist/i, label: "Computer Scientist" },
    { regex: /design engineer/i, label: "Engineer" },
    { regex: /radar designer/i, label: "Engineer" },
    { regex: /lab technician/i, label: "Technician" },
    { regex: /computer consultant/i, label: "Consultant" },
    { regex: /computer engineer/i, label: "Engineer" },
    { regex: /neurophysiologist/i, label: "Neurophysiologist" },
    { regex: /astronomer/i, label: "Astronomer" },
    { regex: /archaeologist/i, label: "Archaeologist" },
    { regex: /defense|military|secretary of defense/i, label: "Military" },
    { regex: /psychic medium/i, label: "Medium" },
    { regex: /researcher/i, label: "Researcher" },
  ];

  for (const pattern of professionPatterns) {
    if (pattern.regex.test(description)) {
      return pattern.label;
    }
  }
  return null;
};

// Get profession badge color based on profession type
const getProfessionBadgeColor = (profession: string): string => {
  const colorMap: { [key: string]: string } = {
    "Software Engineer": "bg-blue-900/30 text-blue-400 border-blue-700/50",
    "UFO Researcher": "bg-purple-900/30 text-purple-400 border-purple-700/50",
    Engineer: "bg-slate-900/30 text-slate-400 border-slate-700/50",
    "Computer Analyst": "bg-cyan-900/30 text-cyan-400 border-cyan-700/50",
    Parapsychologist: "bg-violet-900/30 text-violet-400 border-violet-700/50",
    Writer: "bg-emerald-900/30 text-emerald-400 border-emerald-700/50",
    Journalist: "bg-yellow-900/30 text-yellow-400 border-yellow-700/50",
    Physicist: "bg-indigo-900/30 text-indigo-400 border-indigo-700/50",
    Scientist: "bg-teal-900/30 text-teal-400 border-teal-700/50",
    "Systems Analyst": "bg-cyan-900/30 text-cyan-400 border-cyan-700/50",
    Author: "bg-emerald-900/30 text-emerald-400 border-emerald-700/50",
    Psychiatrist: "bg-pink-900/30 text-pink-400 border-pink-700/50",
    Military: "bg-red-900/30 text-red-400 border-red-700/50",
    Illustrator: "bg-orange-900/30 text-orange-400 border-orange-700/50",
    "Computer Scientist": "bg-blue-900/30 text-blue-400 border-blue-700/50",
    Technician: "bg-gray-900/30 text-gray-400 border-gray-700/50",
    Consultant: "bg-amber-900/30 text-amber-400 border-amber-700/50",
    Neurophysiologist: "bg-rose-900/30 text-rose-400 border-rose-700/50",
    Astronomer: "bg-sky-900/30 text-sky-400 border-sky-700/50",
    Archaeologist: "bg-stone-900/30 text-stone-400 border-stone-700/50",
    Medium: "bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-700/50",
    Researcher: "bg-purple-900/30 text-purple-400 border-purple-700/50",
  };
  return (
    colorMap[profession] || "bg-muted/30 text-muted-foreground border-border"
  );
};

const researchers: Researcher[] = [
  {
    id: 1,
    name: "Alistair Beckham",
    description:
      'Software engineer for Plessey, working on Strategic Defense Initiative ("Star Wars"). Found dead in his garden shed with bare electrical wires wrapped around his chest.',
  },
  {
    id: 2,
    name: "Amy Eskridge",
    description:
      "UFO researcher. Reportedly died in a house fire in 2005. Some sources claim the circumstances were suspicious.",
  },
  {
    id: 3,
    name: "Andrew Hall",
    description:
      "Engineering manager at British Aerospace. Found dead in his car, asphyxiated by fumes from a hose attached to the tailpipe.",
  },
  {
    id: 4,
    name: "Ann Livingston",
    description:
      "UFO researcher and MUFON member who died from aggressive ovarian cancer.",
  },
  {
    id: 5,
    name: "Ashaad Sharif",
    description:
      "Computer analyst at Marconi Defense Systems. Died by decapitation after tying a rope around his neck and driving at high speed.",
  },
  {
    id: 6,
    name: "D Scott Rogo",
    description:
      "Parapsychologist and author on paranormal topics. Found stabbed to death in his home in 1990. Case remains unsolved.",
    publications: [
      "The Poltergeist Experience",
      "Psychic Breakthroughs Today",
      "Mind Over Matter",
    ],
  },
  {
    id: 7,
    name: "Danny Casolaro",
    description:
      "Conspiracy writer and UFO investigator. While on a trip to meet a source of information, was found dead in a bathtub in room 517 of the Sheraton Hotel in Martinsburg, West Virginia.",
  },
  {
    id: 8,
    name: "David Sands",
    description:
      "Satellite projects manager at a Marconi sister company. Died when his car, filled with gasoline cans, crashed into a brick wall.",
  },
  {
    id: 9,
    name: "Don Elkins",
    description:
      'Physicist and UFO researcher, co-founder of L/L Research. Co-author of "The Law of One." Died by suicide in 1984 after a period of mental distress.',
    publications: ["The Law of One"],
  },
  {
    id: 10,
    name: "Dorothy Killgallen",
    description:
      "Journalist who claimed to have information on the JFK assassination and UFOs. Found dead in her apartment in 1965. Officially ruled accidental overdose, but some suspect foul play.",
    publications: ["Girl Around the World", "Murder One"],
  },
  {
    id: 11,
    name: "Dr Fred Bell",
    description:
      "Scientist and UFO researcher, claimed to have worked on classified projects. Died suddenly in 2011 shortly after giving an interview about his work.",
    publications: ["Rays of Truth - Crystals of Light", "The Inside Track"],
  },
  {
    id: 12,
    name: "Dr. Alan J Hynek",
    description:
      'UFO investigator, consultant to Project Bluebook, who died from a brain tumor while hospitalized for prostate surgery. Acquaintances reported "he seemed troubled over some recently acquired data shortly before his fatal hospital stay."',
  },
  {
    id: 13,
    name: "Edward Ruppelt",
    description:
      "Former head of Project Blue Book, UFO researcher. Died of a heart attack at age 37 in 1960, shortly after publishing a revised edition of his UFO book.",
    publications: ["The Report on Unidentified Flying Objects"],
  },
  {
    id: 14,
    name: "Edwin Skeels",
    description:
      "Engineer at Marconi. Found dead in his car from carbon monoxide poisoning.",
  },
  {
    id: 15,
    name: "Eugene Mallove",
    description:
      "Scientist and advocate for cold fusion research. Beaten to death outside his childhood home in 2004. Initially thought to be a robbery gone wrong.",
  },
  {
    id: 16,
    name: "Frank Jennings",
    description:
      "Electronic weapons engineer for Plessey. Allegedly died of a heart attack; no inquest was held.",
  },
  {
    id: 17,
    name: "George Kountis",
    description:
      "Systems analyst at British Polytechnic. Drowned after his car plunged into the Mersey River.",
  },
  {
    id: 18,
    name: "George Van Tassel",
    description:
      "UFO contactee, built the Integratron for time travel and anti-gravity research. Died of a heart attack in 1978, shortly before the Integratron was set to open.",
  },
  {
    id: 19,
    name: "Itzhak Bentov",
    description:
      "Scientist and inventor, wrote about consciousness and paranormal phenomena. Died in a plane crash in 1979 (American Airlines Flight 191).",
    publications: [
      "Stalking the Wild Pendulum",
      "A Brief Tour of Higher Consciousness",
    ],
  },
  {
    id: 20,
    name: "James E. McDonald",
    description:
      "Atmospheric physicist and prominent UFO researcher. Died by suicide in 1971 after a period of personal and professional difficulties.",
  },
  {
    id: 21,
    name: "James Forrestal",
    description:
      "First U.S. Secretary of Defense, allegedly had access to classified UFO information. Died after falling from a window at the National Naval Medical Center.",
  },
  {
    id: 22,
    name: "Jane Roberts",
    description:
      'Author and psychic medium, known for channeling an entity called "Seth". Died in 1984 after a long period of illness. No particularly suspicious circumstances reported.',
    publications: [
      "The Seth Material",
      "Seth Speaks",
      "The Nature of Personal Reality",
    ],
  },
  {
    id: 23,
    name: "Joe Fisher",
    description:
      "Investigative journalist who wrote about channeling and the paranormal. Fell from a cliff in 2001. Ruled a suicide, but some question the circumstances.",
    publications: ["The Siren Call of Hungry Ghosts", "Hungry Ghosts"],
  },
  {
    id: 24,
    name: "John Brittan",
    description:
      "Ministry of Defense tank batteries expert. Found dead in a parked car in his garage from carbon monoxide poisoning.",
  },
  {
    id: 25,
    name: "John E Mack",
    description:
      "Harvard psychiatrist and Pulitzer Prize winner who studied alien abduction cases. Killed by a drunk driver in London in 2004.",
    publications: [
      "Abduction: Human Encounters with Aliens",
      "Passport to the Cosmos",
      "A Prince of Our Disorder",
    ],
  },
  {
    id: 26,
    name: "John Ferry",
    description:
      "Assistant marketing director for Marconi. Found dead with stripped electrical cord leads in his mouth.",
  },
  {
    id: 27,
    name: "Jonathan Walsh",
    description:
      "Digital communications expert working on secret projects. Allegedly fell from his hotel room while on a work assignment.",
  },
  {
    id: 28,
    name: "Karl Wolfe",
    description:
      "Air Force sergeant who claimed to have seen photos of alien structures on the moon. Killed in a bicycle accident in 2018, shortly after publicly discussing his claims.",
  },
  {
    id: 29,
    name: "Karla Turner",
    description:
      "UFO researcher and alien abduction author. Died of breast cancer in 1996, leading to speculation about the cause.",
    publications: ["Into the Fringe", "Taken", "Masquerade of Angels"],
  },
  {
    id: 30,
    name: "Keith Bowden",
    description:
      "Computer scientist at Essex University. Died when his car plunged off a bridge into an abandoned rail yard.",
  },
  {
    id: 31,
    name: "Mac Tonnies",
    description:
      "Author and researcher of UFOs and transhumanism. Died suddenly of cardiac arrhythmia in 2009 at age 34 in Kansas City, Missouri. His blog was called Posthuman Blues.",
    publications: ["The Cryptoterrestrials", "After the Martian Apocalypse"],
  },
  {
    id: 32,
    name: "Mark McCandlish",
    description:
      "Aerospace illustrator and UFO technology researcher. Found dead from a gunshot wound in 2021, ruled a suicide.",
    publications: ["WHY in the World Are They Spraying?", "Above Majestic"],
  },
  {
    id: 33,
    name: "Mark Wisner",
    description:
      "Software engineer at Ministry of Defense experimental station for combat aircraft. Found dead with a plastic bag over his head.",
  },
  {
    id: 34,
    name: "Max Spiers",
    description:
      "UFO researcher and conspiracy theorist. Died suddenly in Poland in 2016. Official cause was natural causes, but some suspect poisoning.",
  },
  {
    id: 35,
    name: "Michael Baker",
    description:
      "Digital communications expert at Plessey Defense Systems. Died when his car crashed through a road barrier.",
  },
  {
    id: 36,
    name: "Mr. X",
    description:
      "Mentioned as a UFO investigator who died under suspicious circumstances. No specific details provided about work or death.",
  },
  {
    id: 37,
    name: "Peter Peapell",
    description:
      "Scientist at Royal Military College of Science. Found dead beneath his car from carbon monoxide poisoning.",
  },
  {
    id: 38,
    name: "Phil Schneider",
    description:
      "Claimed to be a former government geologist with alien encounters. Found dead in his apartment, officially ruled a suicide.",
  },
  {
    id: 39,
    name: "Philip Coppens",
    description:
      "Author and researcher of ancient astronaut theories and UFOs. Died of cancer in 2012, shortly after being diagnosed.",
    publications: [
      "The Ancient Alien Question",
      "The Lost Civilization Enigma",
      "The Canopus Revelation",
    ],
  },
  {
    id: 40,
    name: "Richard Pugh",
    description:
      "Computer consultant for the Ministry of Defense. Found dead, wrapped in rope.",
  },
  {
    id: 41,
    name: "Roger Hill",
    description:
      "Radar designer and draftsman at Marconi. Allegedly killed himself with a shotgun.",
  },
  {
    id: 42,
    name: "Ron Johnson",
    description:
      "MUFON Investigator. While discussing UFO theories at a Society for Scientific Exploration meeting in Texas, he suddenly and unexpectedly passed away. 1994. He was 43 years old.",
  },
  {
    id: 43,
    name: "Ron Rummel (Creston)",
    description:
      "UFO researcher. Found dead with a gunshot wound to the mouth, officially ruled a suicide but circumstances questioned.",
  },
  {
    id: 44,
    name: "Russel Smith",
    description:
      "Lab technician at the Atomic Energy Research Establishment. Body found at the base of a cliff.",
  },
  {
    id: 45,
    name: "Serge Monast",
    description:
      "Investigative journalist and conspiracy theorist. Died of a heart attack in 1996 at age 51, allegedly the day before a planned lecture.",
  },
  {
    id: 46,
    name: "Stuart Gooding",
    description:
      "Postgraduate research student at Royal Military College of Science. Died in a car wreck during military exercises in Cyprus.",
  },
  {
    id: 47,
    name: "Tracy Twyman",
    description:
      "Researcher and author of occult topics and conspiracy theories. Found hanged in 2019. Ruled a suicide, but some question the circumstances.",
    publications: [
      "The Merovingian Mythos",
      "Mind-Controlled Sex Slaves",
      "Genuflect",
    ],
  },
  {
    id: 48,
    name: "Trevor Knight",
    description:
      "Computer engineer at Marconi Space and Defense Systems. Found dead in his car, asphyxiated by fumes from a hose.",
  },
  {
    id: 49,
    name: "Uyrangé Hollanda",
    description:
      "Brazilian UFO researcher. Found hanging in his home in 1997. Officially ruled a suicide, but some dispute this.",
  },
  {
    id: 50,
    name: "Victor Moore",
    description:
      "Design engineer at Marconi Space Systems. Found dead of a drug overdose.",
  },
  {
    id: 51,
    name: "Vimal Dajibhai",
    description:
      "Computer software engineer working on guidance systems for Marconi Underwater Systems. Body found below a suspension bridge.",
  },
  {
    id: 52,
    name: "Marcia Moore",
    description:
      'Heiress to the Sheraton Hotel fortune, author of "Hypersentience" and co-author of "Journeys into the Bright World" about ketamine. Found dead in the woods, 1981, after going missing in 1979. Her son, Christopher Roof, also later went mysteriously missing - remains were found in Maine in 2010.',
    publications: ["Hypersentience", "Journeys into the Bright World"],
  },
  {
    id: 53,
    name: "Erin Valenti",
    description:
      "33 year-old successful CEO of a tech company. Last conversation with parents said, \"It's all a game, it's a thought experiment, we're in the Matrix.\" Found dead in her car 5 days later. 2019.",
  },
  {
    id: 54,
    name: "Dr. Jacobo Grinberg",
    description:
      "Mexican neurophysiologist and author of over 50 books about the paranormal, consciousness, and the holographic matrix. Mysteriously went missing in 1994. His last wife, Teresa Mendoza, also disappeared.",
    publications: [
      "The Syntergic Theory",
      "Brain and Consciousness",
      "Creating Reality",
    ],
  },
  {
    id: 55,
    name: "Jim Keith",
    description:
      'Author of 12 books about mind control, the NWO, black helicopters, Men in Black, etc. Died from a blood clot after falling at Burning Man. Prophetically stated "if they put me under, I\'m not coming back." His publisher, Ron Bonds of IllumiNet Press, later died in 2001 in Atlanta from food poisoning.',
    publications: [
      "Black Helicopters Over America",
      "Mind Control and UFOs",
      "The Octopus",
    ],
  },
  {
    id: 56,
    name: "William Cooper",
    description:
      'Author of Behold a Pale Horse, warned of multiple global conspiracies, some involving extraterrestrial life. Fatally shot outside his Eagar, Arizona home, after years of conflict with authorities. Vowed that "he would not be taken alive".',
    publications: ["Behold a Pale Horse"],
  },
  {
    id: 57,
    name: "M. K. Jessup",
    description:
      "Astronomer and archaeologist. Author of The Case for the UFO and The Expanding Case for the UFO, allegedly committed suicide in Dade County Park, Florida, in 1959.",
    publications: ["The Case for the UFO", "The Expanding Case for the UFO"],
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResearchers = useMemo(() => {
    if (!searchTerm) return researchers;
    return researchers.filter(
      (researcher) =>
        researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        researcher.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative">
        {/* Starry background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-amber-500/10" />
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fd8d10310d21a4d34b9db7b8d93111994%2Fcf600bed16bc44fc979b70e07a4d6049?format=webp&width=800"
                  alt="UFO with emanating light beams"
                  className="relative h-20 w-20 object-contain"
                  style={{
                    mixBlendMode: "screen",
                    filter: "brightness(1.1) contrast(1.2)",
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                The Removed List
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                UFO, alien, and matrix researchers removed from the human
                equation
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {researchers.length}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Researchers
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1959-2021</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Time Span
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search researchers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border focus:border-primary transition-colors"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-muted-foreground text-center">
              Found {filteredResearchers.length} of {researchers.length}{" "}
              researchers
            </div>
          )}
        </div>
      </div>

      {/* Researchers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResearchers.map((researcher) => (
            <Card
              key={researcher.id}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {researcher.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs border-border text-muted-foreground"
                  >
                    #{researcher.id.toString().padStart(2, "0")}
                  </Badge>
                </div>
                {(() => {
                  const profession = extractProfession(researcher.description);
                  return profession ? (
                    <div className="mt-2">
                      <div
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border shadow-sm ${getProfessionBadgeColor(profession)} backdrop-blur-sm`}
                        style={{
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {profession}
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {researcher.description}
                </p>
                {researcher.publications && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground/80 mb-1 font-medium">
                      Notable Works:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {researcher.publications.map((publication, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-muted/30 text-muted-foreground/90 rounded border border-border/30 italic"
                        >
                          {publication}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResearchers.length === 0 && (
          <div className="text-center py-16">
            <div className="space-y-4">
              <User className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium text-foreground">
                No researchers found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              This information is compiled for research and educational purposes
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>multidimensional • ultraterrestrial • extracelestial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
