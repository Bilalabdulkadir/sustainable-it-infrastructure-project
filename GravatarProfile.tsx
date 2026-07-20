import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Linkedin, 
  MapPin, 
  Mail, 
  Calendar, 
  Phone, 
  ExternalLink, 
  ChevronRight, 
  Globe, 
  FileText, 
  Sparkles,
  X,
  Smartphone
} from "lucide-react";

export default function GravatarProfile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bilalabdulkadir",
      icon: <Linkedin className="w-4 h-4" />,
      color: "hover:text-white hover:bg-[#0077B5] hover:border-[#0077B5]",
    },
    {
      name: "Bluesky",
      url: "https://bsky.app/profile/bilalabdulkadirmuhammed.link",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
          <path d="M111.8 111.8C162.7 60.9 245.1 60.9 296 111.8L352 167.8l56-56c50.9-50.9 133.3-50.9 184.2 0s50.9 133.3 0 184.2L416 472c-15.6 15.6-40.9 15.6-56.6 0L111.8 296c-50.9-50.9-50.9-133.3 0-184.2z" />
        </svg>
      ),
      iconRaw: (
        <span className="font-bold text-[10px]">🦋</span>
      ),
      color: "hover:text-white hover:bg-[#3B82F6] hover:border-[#3B82F6]",
    },
    {
      name: "WordPress",
      url: "https://generouslyglorious9b4fcdf03f-rlnpz.wordpress.com",
      icon: <Globe className="w-4 h-4" />,
      color: "hover:text-white hover:bg-[#21759B] hover:border-[#21759B]",
    },
    {
      name: "Website",
      url: "https://bilalabdulkadirmuhammed.link?utm_source=hovercard",
      icon: <Globe className="w-4 h-4" />,
      color: "hover:text-white hover:bg-[#1B4332] hover:border-[#1B4332]",
    }
  ];

  const contactItems = [
    {
      label: "Email Address",
      value: "bilalabdulkadir286@gmail.com",
      url: "mailto:bilalabdulkadir286@gmail.com",
      icon: <Mail className="w-5 h-5 text-[#1B4332]" />,
    },
    {
      label: "Calendar / Zoom Chat",
      value: "Direct Chat Invite Link",
      url: "https://us05web.zoom.us/chat/invite/0cZWbE-M3E1Z6Br1zGvX5",
      icon: <Calendar className="w-5 h-5 text-[#1B4332]" />,
    },
    {
      label: "Cognito Form",
      value: "cognitoforms.com/ContactForm",
      url: "https://www.cognitoforms.com/BilalAbdulkadir/ContactForm",
      icon: <FileText className="w-5 h-5 text-[#1B4332]" />,
    },
    {
      label: "Phone Contact",
      value: "+251941322948",
      url: "tel:+251941322948",
      icon: <Smartphone className="w-5 h-5 text-[#1B4332]" />,
    },
  ];

  return (
    <div id="gravatar-profile-card" className="bg-white border border-gold-muted/30 rounded-[32px] p-6 md:p-8 relative overflow-hidden shadow-[0_16px_48px_rgba(179,146,82,0.06),0_4px_12px_rgba(27,67,50,0.02)] hover:border-gold-muted/50 transition-all duration-300">
      {/* Background Graphic Accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#76C893]/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B4332]/3 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

      {/* Profile Header section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#1B4332] to-[#76C893] rounded-[28px] blur-sm opacity-20 group-hover:opacity-50 transition duration-500" />
          <a
            href="https://bilalabdulkadirmuhammed.link?utm_source=hovercard"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-[24px] overflow-hidden border border-[#1B4332]/10 bg-[#F9FBF7] w-32 h-32 p-1.5"
          >
            <img
              src="https://2.gravatar.com/avatar/0deb964c26e8bc1d216ff99e022efd48536862ac224b34d08545b2cc63d47776?s=256&d=initials"
              alt="Bilal Abdulkadir"
              className="w-full h-full object-cover rounded-[18px] transition duration-500 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Core Info */}
        <div className="flex-1 text-center md:text-left space-y-3.5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <h1 className="text-3xl font-serif italic tracking-tight text-[#1B4332]">Bilal Abdulkadir</h1>
            <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#76C893]/10 text-[#1B4332] border border-[#76C893]/20">
              <Sparkles className="w-3 h-3 text-[#1B4332]" /> Available for Hire
            </span>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#1B4332]/70">
              IT Support Specialist &bull; Data Analyst Associate Intern
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-[#1B4332]/60">
              <MapPin className="w-4 h-4 text-[#1B4332]/40 shrink-0" />
              <span>Jimma, Ethiopia &bull; Open to Relocation</span>
            </div>
          </div>

          <p className="text-sm text-[#1B4332]/80 leading-relaxed max-w-2xl">
            IT Support Specialist and Data Analyst with experience in SQL, Python, Power BI, and digital marketing analytics. I hold a B.Sc. in Information Technology from Jimma University and am currently completing the Excelerate 2026 Data Analytics Internship. Passionate about AI, cloud computing, and data-driven decision-making, I actively participate in international youth and climate leadership initiatives. Open to relocation and committed to using technology and data to solve real-world challenges.
          </p>

          <div className="h-px bg-[#1B4332]/10" />

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full text-[#1B4332]/70 border border-[#1B4332]/10 bg-[#1B4332]/3 transition-all duration-300 ${link.color}`}
                  title={link.name}
                >
                  {link.name === "Bluesky" ? (
                    <div className="flex items-center justify-center gap-1">
                      {link.iconRaw}
                    </div>
                  ) : (
                    link.icon
                  )}
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-[#1B4332]/20 hidden md:block" />

            {/* Main Contact Action */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-3 rounded-full bg-[#1B4332] hover:bg-[#1B4332]/90 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-[#1B4332]/10 flex items-center gap-2 group hover:scale-[1.02]"
            >
              Get In Touch
              <ChevronRight className="w-4 h-4 transition duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Contact Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#1B4332] z-50 pointer-events-auto"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F9FBF7] border-l border-[#1B4332]/10 shadow-2xl z-50 p-8 flex flex-col pointer-events-auto text-[#1B4332]"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-6 border-b border-[#1B4332]/10 mb-6">
                <div>
                  <h2 className="text-2xl font-serif italic text-[#1B4332]">Contact & Connect</h2>
                  <p className="text-xs text-[#1B4332]/60 mt-1">Direct channels to reach Bilal Abdulkadir</p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2.5 rounded-full bg-white border border-[#1B4332]/10 text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5 transition"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Bio Summary inside Drawer */}
              <div className="p-4 bg-white rounded-[24px] border border-gold-muted/25 mb-6 flex gap-4 items-center shadow-[0_4px_20px_rgba(179,146,82,0.04)]">
                <img
                  src="https://2.gravatar.com/avatar/0deb964c26e8bc1d216ff99e022efd48536862ac224b34d08545b2cc63d47776?s=256&d=initials"
                  alt="Bilal"
                  className="w-12 h-12 rounded-[16px] object-cover border border-[#1B4332]/10"
                />
                <div>
                  <h3 className="font-semibold text-[#1B4332] text-sm">Bilal Abdulkadir</h3>
                  <p className="text-xs text-[#1B4332]/60 font-mono">Jimma University IT Alumnus</p>
                </div>
              </div>

              {/* Contact Links */}
              <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-[20px] border border-gold-muted/20 bg-white hover:bg-gold-muted/5 hover:border-gold-muted/40 transition duration-200 group shadow-[0_2px_12px_rgba(179,146,82,0.03)]"
                  >
                    <div className="p-3 rounded-[12px] bg-[#F9FBF7] border border-[#1B4332]/10 text-[#1B4332]">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] text-[#1B4332]/50 uppercase tracking-wider font-bold mb-0.5">{item.label}</span>
                      <span className="block text-sm text-[#1B4332] font-semibold truncate group-hover:text-[#76C893] transition">
                        {item.value}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#1B4332]/30 opacity-0 group-hover:opacity-100 transition" />
                  </a>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-[#1B4332]/10 text-center">
                <a
                  href="https://bilalabdulkadirmuhammed.link?utm_source=profile-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#1B4332] hover:text-[#76C893] font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  Visit Main Portfolio website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] text-[#1B4332]/40 mt-4 tracking-wider">
                  &copy; {new Date().getFullYear()} Bilal Abdulkadir Muhammed.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
