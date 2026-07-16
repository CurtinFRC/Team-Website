export type Faq = {
  question: string
  answer: string
}

/**
 * FAQ content, verbatim from mirror/content-notes.md (§ /faq). The live site
 * ships an accordion whose answers only exist in the client-rendered DOM (not
 * the static HTML) — Phase 0 captured them anyway, so this list is the fix for
 * a page that would otherwise 404 its own content on a JS-disabled or
 * pre-hydration render.
 *
 * A few answers mention other pages by name ("recruitment page", "About
 * FIRST® page", "Team Handbook", "Contact Us page", "Join Now page"). The
 * live text isn't a real hyperlink in the static markup (it's inside the
 * client-rendered accordion), but the intent is clearly navigational, so
 * components/faq-accordion.tsx turns those mentions into links to the
 * matching route.
 */

/**
 * Answer phrases the accordion renders as links. Lives next to the answers
 * (rather than in the component) because the two are coupled: tests/faq.test.ts
 * asserts every phrase still occurs in at least one answer, so a copy edit
 * can't silently drop a link.
 */
export const linkablePhrases: Record<string, string> = {
  'recruitment page': '/recruitment',
  'About FIRST® page': '/first',
  'Team Handbook': '/handbook',
  'Contact Us page': '/contact',
  'Join Now page': '/recruitment',
  'support us': '/support',
}

export const faqs: Faq[] = [
  {
    question: 'What does “4788” mean?',
    answer:
      'Our team competes in the FIRST® Robotics Competition in which each team is given a number based on the order in which they join. This means that our team was the 4,788th team to join the competition (although, we are not the orginal bearers of this number). FIRST® uses this number to identify our team at competitions and in leader boards.',
  },
  {
    question: 'What are FIRST and FRC?',
    answer:
      'FIRST® is a non-profit organization which stands for For Inspiration and Recognition of Science and Technology. It was established to encourage students of all ages to participate in robotics and technology-related events. FIRST® runs many robotics programs, and FRC, short for FIRST® Robotics Competition, is the FIRST® flagship program in which our team participates. You can read more about FIRST® on our About FIRST® page.',
  },
  {
    question: 'Why are you doing all this?',
    answer:
      'The robotics team exists as a way to educate young people and get them excited about science, technology, engineering, and math. We are part of a network of local and international FRC teams created for the same reason. Competing in FIRST® Robotics competitions gives us hands-on experience in areas like mechanical engineering and programming, and encourages us to think creatively as we solve problems with limited materials and limited time in a team based environment.',
  },
  {
    question: 'I’d like to join! What do I have to do?',
    answer:
      'Please see our recruitment page for the most in depth breakdown. You can also email FIRSTRoboticsTeam@curtin.edu.au for more information on the coming season, or see our Team Handbook for information on becoming a team member. Preseason is held in spring, so more information may also be available then!',
  },
  {
    question: 'What kinds of opportunities are there on the team?',
    answer:
      'While on the team you have the chance to learn a variety of skills from other students and mentors. If you wish to work on things like programming, mechanical, or electrical, the team is more than willing to educate you on such subjects and give you a practical chance to apply. If subjects like public relations, financing, photography, or film making interest you, the team also caters to these humanities interests.',
  },
  {
    question: 'This is wicked! How can I help support the team?',
    answer:
      'We are always looking to create new connections and build partnerships, our program thrives under the support of volunteers and sponsors. If you are looking to sponsor us, please reach out to FIRSTRoboticsTeam@curtin.edu.au or/and click on support us at the top of this page. If you have experience in engineering, mechanics, programming, or media and wish to mentor high school students, please email us at FIRSTRoboticsTeam@curtin.edu.au, go to our Contact Us page, or visit our Join Now page for more information.',
  },
  {
    question:
      'I just was reading about FIRST® and everyone was talking about “gracious professionalism” and “coopertition”. What is that?',
    answer:
      '“Gracious professionalism” or “coopertiton” is one way that FIRST® tries to be different from many other sports. Gracious professionalism is the idea of behaving maturely and responsibly and being respectful of other teams, FIRST® officials, and generally everyone involved in the competition. Gracious professionalism also means helping out other teams, whether by lending parts or manpower, so that everyone can compete and have a good time. Coopertition is the idea of competing cooperatively with other teams. Teams are grouped into alliances, usually of three teams, which compete against other alliances. This way, robots are able to work alongside other robots. These concepts are so deeply woven into FIRST® culture that formal awards are issued to teams which act as exemplars for gracious professionalism and coopertition.',
  },
  {
    question: 'I have a question or want to learn more about 4788 and what you do. Where do I ask?',
    answer:
      'Send us a message through the Contact Us page, and we’ll try to get back to you ASAP. Please remember that this isn’t a full-time job for any of us, and it may take us a couple days to get back to you, particularly if your question requires a team discussion or a particular person’s input. We value and appreciate your question/comments so don\'t hesitate to email us anytime. FIRSTRoboticsTeam@curtin.edu.au',
  },
]
