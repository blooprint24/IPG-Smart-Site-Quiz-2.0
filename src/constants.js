export const QUADRANTS = {
    VISIBILITY: {
        id: 'visibility',
        name: 'Visibility',
        icon: 'Eye',
        color: 'blue',
        description: 'Risk of Being Ignored: Can the right people find you and know what to do?',
        insight: 'In business, risk is something that hurts the business if it keeps going unfixed. When people can’t find you or don’t know what to do next, growth becomes risky — even if you’re great at what you do.',
        pressureText: 'When people can’t find you or don’t know what to do next, growth becomes risky.'
    },
    RESPONSE: {
        id: 'response',
        name: 'Response',
        icon: 'Phone',
        color: 'green',
        description: 'Risk of Missed Opportunities: What happens when someone reaches out?',
        insight: 'Missed or delayed responses increase the chance of lost revenue and create a feeling of constant "catching up."',
        pressureText: 'How your business handles calls, texts, and follow-ups.'
    },
    OPERATIONS: {
        id: 'operations',
        name: 'Operations',
        icon: 'Settings',
        color: 'orange',
        description: 'Risk of Collapse Without You: Does the business keep working if you step away?',
        insight: 'When everything depends on the owner, growth increases risk and quickly leads to burnout.',
        pressureText: 'The risk that the business stops working whenever you do.'
    },
    MONEY_CONTROL: {
        id: 'money_control',
        name: 'Money & Control',
        icon: 'BarChart3',
        color: 'purple',
        description: 'Risk of Surprise: Can you see problems early, or do they surprise you?',
        insight: 'Businesses that see problems early survive longer. Without visibility into your numbers, you’re guessing instead of growing.',
        pressureText: 'The risk of being surprised by your own business results.'
    }
};

export const QUESTIONS = [
    // Visibility
    {
        id: 1,
        quadrant: 'VISIBILITY',
        text: 'How do new customers most often find your business today?',
        options: [
            { text: 'They don’t yet (I’m still planning)', weight: 3 },
            { text: 'Mostly word-of-mouth or referrals', weight: 2 },
            { text: 'A mix of referrals and some online presence', weight: 1 },
            { text: 'A predictable, automated system brings them in', weight: 0 }
        ]
    },
    {
        id: 2,
        quadrant: 'VISIBILITY',
        text: 'When someone finds you online, how clear is the "Next Step" they should take?',
        options: [
            { text: 'It’s not clear or doesn’t exist yet', weight: 3 },
            { text: 'They have to look for a phone number or email', weight: 2 },
            { text: 'There is a "Contact" button, but it’s just a generic form', weight: 1 },
            { text: 'There is a crystal clear, easy path to engage immediately', weight: 0 }
        ]
    },
    {
        id: 3,
        quadrant: 'VISIBILITY',
        text: 'If you stopped manual networking today, what would happen to your lead flow?',
        options: [
            { text: 'It would stop completely', weight: 3 },
            { text: 'It would drop significantly', weight: 2 },
            { text: 'It would slow down, but keep moving', weight: 1 },
            { text: 'Nothing—my systems handle discovery for me', weight: 0 }
        ]
    },
    // Response
    {
        id: 4,
        quadrant: 'RESPONSE',
        text: 'What happens when a potential customer calls and you can’t answer?',
        options: [
            { text: 'They leave a voicemail (maybe) and I call back later', weight: 3 },
            { text: 'They just hang up and I try to call back when I see the missed call', weight: 3 },
            { text: 'My phone system notifies me, but I still have to call back manually', weight: 2 },
            { text: 'An automated "Missed Call Text Back" starts the conversation for me', weight: 0 }
        ]
    },
    {
        id: 5,
        quadrant: 'RESPONSE',
        text: 'How quickly do you typically respond to a new inquiry?',
        options: [
            { text: 'Within 24 hours', weight: 3 },
            { text: 'A few hours later', weight: 2 },
            { text: 'Within 15-30 minutes', weight: 1 },
            { text: 'Instantly, thanks to automated systems', weight: 0 }
        ]
    },
    {
        id: 6,
        quadrant: 'RESPONSE',
        text: 'How do you keep track of people you need to follow up with?',
        options: [
            { text: 'In my head or on paper scraps', weight: 3 },
            { text: 'In my email inbox or phone call log', weight: 2 },
            { text: 'A manual spreadsheet or basic list', weight: 1 },
            { text: 'An automated CRM that reminds me or sends follow-ups for me', weight: 0 }
        ]
    },
    // Operations
    {
        id: 7,
        quadrant: 'OPERATIONS',
        text: 'If you took a 2-week vacation with no phone, what would happen to the business?',
        options: [
            { text: 'It would stop entirely', weight: 3 },
            { text: 'Chaos—things would break and customers would be upset', weight: 2 },
            { text: 'It would survive, but growth would pause', weight: 1 },
            { text: 'It would keep running and growing without me', weight: 0 }
        ]
    },
    {
        id: 8,
        quadrant: 'OPERATIONS',
        text: 'How much of your daily work could potentially be performed by a system or an assistant?',
        options: [
            { text: 'Almost all of it', weight: 3 },
            { text: 'A significant portion', weight: 2 },
            { text: 'Some of it', weight: 1 },
            { text: 'Very little', weight: 0 }
        ]
    },
    {
        id: 9,
        quadrant: 'OPERATIONS',
        text: 'Of the work that *could* be automated or delegated, how much are you currently handling manually?',
        options: [
            { text: 'Everything—I still do it all myself', weight: 3 },
            { text: 'Most of it—I haven’t offloaded much yet', weight: 2 },
            { text: 'Some of it—I’ve started to delegate or automate', weight: 1 },
            { text: 'None—my systems or team handle it for me', weight: 0 }
        ]
    },
    {
        id: 10,
        quadrant: 'OPERATIONS',
        text: 'How do you feel about scaling or adding more customers right now?',
        options: [
            { text: 'Terrified—it would lead to burnout or collapse', weight: 3 },
            { text: 'Stressed—I’m already at capacity', weight: 2 },
            { text: 'Ready, but I’d need to work more hours', weight: 1 },
            { text: 'Excited—my systems are built for it', weight: 0 }
        ]
    },
    // Money & Control
    {
        id: 11,
        quadrant: 'MONEY_CONTROL',
        text: 'How clearly can you see your "Numbers" (Leads -> Sales -> Profit) today?',
        options: [
            { text: 'I don’t really track them yet (or it’s a guess)', weight: 3 },
            { text: 'I check my bank account to see how I’m doing', weight: 2 },
            { text: 'I have a spreadsheet I update manually once a month', weight: 1 },
            { text: 'I have a real-time dashboard that shows me everything', weight: 0 }
        ]
    },
    {
        id: 12,
        quadrant: 'MONEY_CONTROL',
        text: 'When a problem happens in the business, how do you usually find out?',
        options: [
            { text: 'When a customer complains or money runs low', weight: 3 },
            { text: 'When I notice things feel "off" or stressful', weight: 2 },
            { text: 'When I do my monthly review', weight: 1 },
            { text: 'My systems alert me to the dip before it becomes a crisis', weight: 0 }
        ]
    },
    {
        id: 13,
        quadrant: 'MONEY_CONTROL',
        text: 'Do you know exactly which marketing efforts are bringing in the most profit?',
        options: [
            { text: 'No idea—I just hope it works', weight: 3 },
            { text: 'I have a general feeling, but no data', weight: 2 },
            { text: 'I track it roughly by asking "How did you hear about us?"', weight: 1 },
            { text: 'Yes, I track the exact ROI of every source', weight: 0 }
        ]
    }
];
