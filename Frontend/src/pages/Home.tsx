import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Users, Calendar, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-group-photo.jpg";
import Default from "@/assets/DefaultIMG.jpg"

const teamMembers = [
  {
    name: "CH. Mohan Sathvik",
    role: "President / Club Lead",
    image: Default,
    bio: "Visionary leader driving the club's mission to democratize AI education. Passionate about machine learning, leadership, and building a strong AI community."
  },
  {
    name: "B. Manoj Kumar",
    role: "Technical Head",
    image: Default,
    bio: "Computer Science enthusiast specializing in MERN stack and AI/ML applications. Leads the technical direction of projects and ensures smooth execution of club initiatives."
  },
  {
    name: "B. Akhil",
    role: "Research & Development Lead",
    image: Default,
    bio: "Dedicated researcher exploring AI innovations in NLP and deep learning. Focuses on driving R&D efforts and experimenting with cutting-edge technologies."
  },
  {
    name: "Sahith",
    role: "Projects Coordinator",
    image: Default,
    bio: "Manages AI-driven project development and collaborations. Skilled in coordinating teams, tracking progress, and ensuring impactful project outcomes."
  },
  {
    name: "Bhuvana",
    role: "Workshops & Training Lead",
    image: Default,
    bio: "Passionate about knowledge-sharing and AI skill development. Designs and delivers engaging workshops, bootcamps, and hands-on training sessions for students."
  },
  {
    name: "Fathima",
    role: "Events Head",
    image: Default,
    bio: "Creative organizer ensuring smooth execution of events, hackathons, and seminars. Known for bringing industry experts and students together for impactful experiences."
  },
  {
    name: "P. Manasa",
    role: "Public Relations (PR) / Outreach Lead",
    image: Default,
    bio: "Handles external communications, partnerships, and outreach. Skilled in building strong networks that connect the club with industry and academic leaders."
  },
  {
    name: "K. Revathi",
    role: "Marketing & Design Head",
    image: Default,
    bio: "Creative thinker with expertise in branding, social media, and design. Leads the club’s marketing campaigns and ensures a strong digital presence."
  },
  {
    name: "Pavithra",
    role: "Membership Coordinator",
    image: Default,
    bio: "Responsible for student onboarding and membership programs. Focused on building a vibrant AI community with active student participation."
  },
  {
    name: "G. Jhansi",
    role: "Innovation & Idea Head",
    image: Default,
    bio: "Encourages students to explore creative AI applications. Drives brainstorming sessions, idea pitching, and innovation challenges."
  },
  {
    name: "R. Sravanthi",
    role: "Community Engagement Lead",
    image: Default,
    bio: "Leads initiatives to keep the community active and engaged. Organizes peer-learning sessions, discussions, and collaborative events."
  }
];

const stats = [
  { icon: Users, label: "Active Members", value: "15" },
  { icon: Calendar, label: "Events This Year", value: "0" },
  { icon: Trophy, label: "Competition Wins", value: "0" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-primary">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-semibold">Welcome to AI Club</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Shaping the Future with{" "}
                  <span className="text-gradient">Artificial Intelligence</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join our community of innovators, researchers, and dreamers. 
                  We're building the next generation of AI professionals through 
                  hands-on workshops, cutting-edge research, and collaborative projects.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto group">
                    Explore Events
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/workshops">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Workshops
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="AI Club Team"
                  className="rounded-2xl shadow-elegant w-full h-auto hover-lift"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team is committed to fostering innovation and excellence 
              in artificial intelligence education and research.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="hover-lift bg-card-gradient border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-elegant"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <div className="text-primary font-semibold mb-4">{member.role}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Join the AI Revolution?
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't miss out on our upcoming events and workshops. 
              Connect with like-minded individuals and build the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  View Upcoming Events
                </Button>
              </Link>
              <Link to="/workshops">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Workshops
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;