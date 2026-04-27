import { useState, useMemo, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend as RLegend } from "recharts";
import { Trophy, User, DollarSign, Home, ChevronRight, ChevronLeft, Award, Flag, TrendingUp, Users, MapPin, Calendar } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const COURSES = {
  redcrest: {
    name: "Redcrest Golf Club",
    venue: "Redcrest Golf Club",
    tees: "Black Tees",
    totalYards: 6744,
    rating: 72.5,
    slope: 143,
    par: 71,
    holes: [
      { num: 1, yards: 426, par: 4, hdcp: 5, tee: "Black" },
      { num: 2, yards: 199, par: 3, hdcp: 9, tee: "Black" },
      { num: 3, yards: 372, par: 4, hdcp: 15, tee: "Black" },
      { num: 4, yards: 383, par: 4, hdcp: 11, tee: "Black" },
      { num: 5, yards: 394, par: 4, hdcp: 13, tee: "Black" },
      { num: 6, yards: 529, par: 5, hdcp: 3, tee: "Black" },
      { num: 7, yards: 562, par: 5, hdcp: 1, tee: "Black" },
      { num: 8, yards: 169, par: 3, hdcp: 17, tee: "Black" },
      { num: 9, yards: 373, par: 4, hdcp: 7, tee: "Black" },
      { num: 10, yards: 561, par: 5, hdcp: 2, tee: "Black" },
      { num: 11, yards: 359, par: 4, hdcp: 12, tee: "Black" },
      { num: 12, yards: 226, par: 3, hdcp: 8, tee: "Black" },
      { num: 13, yards: 358, par: 4, hdcp: 18, tee: "Black" },
      { num: 14, yards: 341, par: 4, hdcp: 14, tee: "Black" },
      { num: 15, yards: 384, par: 4, hdcp: 16, tee: "Black" },
      { num: 16, yards: 453, par: 4, hdcp: 6, tee: "Black" },
      { num: 17, yards: 213, par: 3, hdcp: 10, tee: "Black" },
      { num: 18, yards: 442, par: 4, hdcp: 4, tee: "Black" },
    ],
  },
  legend: {
    name: "Legend Course",
    venue: "Woodington Lake Golf Club",
    tees: "TCOJ Tees",
    totalYards: 6865,
    rating: 73.49,
    slope: 143.06,
    par: 72,
    holes: [
      { num: 1, yards: 410, par: 4, hdcp: 3, tee: "Green" },
      { num: 2, yards: 524, par: 5, hdcp: 7, tee: "Green" },
      { num: 3, yards: 182, par: 3, hdcp: 13, tee: "Green" },
      { num: 4, yards: 534, par: 5, hdcp: 1, tee: "Green" },
      { num: 5, yards: 407, par: 4, hdcp: 5, tee: "Green" },
      { num: 6, yards: 189, par: 3, hdcp: 9, tee: "Blue" },
      { num: 7, yards: 293, par: 4, hdcp: 17, tee: "Blue" },
      { num: 8, yards: 415, par: 4, hdcp: 11, tee: "Green" },
      { num: 9, yards: 413, par: 4, hdcp: 15, tee: "Green" },
      { num: 10, yards: 416, par: 4, hdcp: 14, tee: "Green" },
      { num: 11, yards: 200, par: 3, hdcp: 16, tee: "Green" },
      { num: 12, yards: 540, par: 5, hdcp: 8, tee: "Blue" },
      { num: 13, yards: 402, par: 4, hdcp: 4, tee: "Blue" },
      { num: 14, yards: 388, par: 4, hdcp: 12, tee: "Green" },
      { num: 15, yards: 419, par: 4, hdcp: 2, tee: "Blue" },
      { num: 16, yards: 179, par: 3, hdcp: 18, tee: "Green" },
      { num: 17, yards: 544, par: 5, hdcp: 10, tee: "Green" },
      { num: 18, yards: 410, par: 4, hdcp: 6, tee: "Green" },
    ],
  },
  legacy: {
    name: "Legacy Course",
    venue: "Woodington Lake Golf Club",
    tees: "TCOJ Tees",
    totalYards: 6743,
    rating: 72.73,
    slope: 137.11,
    par: 72,
    holes: [
      { num: 1, yards: 481, par: 5, hdcp: 13, tee: "Green" },
      { num: 2, yards: 412, par: 4, hdcp: 1, tee: "Green" },
      { num: 3, yards: 398, par: 4, hdcp: 9, tee: "Green" },
      { num: 4, yards: 176, par: 3, hdcp: 11, tee: "Blue" },
      { num: 5, yards: 390, par: 4, hdcp: 7, tee: "Green" },
      { num: 6, yards: 445, par: 4, hdcp: 5, tee: "Green" },
      { num: 7, yards: 550, par: 5, hdcp: 3, tee: "Green" },
      { num: 8, yards: 171, par: 3, hdcp: 15, tee: "Green" },
      { num: 9, yards: 387, par: 4, hdcp: 17, tee: "Green" },
      { num: 10, yards: 430, par: 4, hdcp: 8, tee: "Green" },
      { num: 11, yards: 410, par: 4, hdcp: 2, tee: "Green" },
      { num: 12, yards: 166, par: 3, hdcp: 10, tee: "Blue" },
      { num: 13, yards: 412, par: 4, hdcp: 4, tee: "Green" },
      { num: 14, yards: 527, par: 5, hdcp: 12, tee: "Green" },
      { num: 15, yards: 118, par: 3, hdcp: 18, tee: "Green" },
      { num: 16, yards: 388, par: 4, hdcp: 6, tee: "Green" },
      { num: 17, yards: 377, par: 4, hdcp: 16, tee: "Green" },
      { num: 18, yards: 505, par: 5, hdcp: 14, tee: "Green" },
    ],
  },
};

const TOURNAMENTS = {
  2018: {
    year: 2018,
    yearNum: 1,
    name: "SGP Classic Year 1",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    date: "July 21, 2018",
    round1Format: "2-Man Net Best Ball",
    round1Course: "Legend",
    round2Format: "2-Man Net Best Ball",
    round2Course: "Legacy",
    entryFee: 50,
    prizePool: 600,
    prizeSplit: { first: 300, second: 200, third: 100 },
    teams: [
      { num: 1, p1: "Keon Karamchi", p2: "Nolan Rundle" },
      { num: 2, p1: "Dave MacDougall", p2: "Ben Barrett" },
      { num: 3, p1: "Paul Statchuk", p2: "Brendan Black" },
      { num: 4, p1: "Nick Crain", p2: "Chris Statchuk" },
      { num: 5, p1: "Reid Hartley", p2: "Tyler Perry" },
      { num: 6, p1: "Anthony Laud", p2: "Geoff Crain" },
    ],
    leaderboard: [
      { pos: 1, team: "Karamchi/Rundle", teamNum: 1, totalNet: null, toPar: -13, prize: 300, note: "Won in playoff" },
      { pos: 2, team: "MacDougall/Barrett", teamNum: 2, totalNet: null, toPar: -13, prize: 200 },
      { pos: 3, team: "Statchuk/Black", teamNum: 3, totalNet: null, toPar: null, prize: 100 },
      { pos: "Last", team: "Crain/Statchuk", teamNum: 4, totalNet: null, toPar: null, prize: 0 },
    ],
    lowGross: { player: "Reid Hartley", score: 76, toPar: 4, course: "Legend" },
    individualScores: [
      { name: "Reid Hartley", gross: 76, toPar: 4 },
      { name: "Chris Statchuk", gross: 76, toPar: 4 },
      { name: "Tyler Perry", gross: 77, toPar: 5 },
    ],
    parimutuel: null,
  },
  2019: {
    year: 2019,
    yearNum: 2,
    name: "SGP Classic Year 2",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    date: "July 27, 2019",
    round1Format: "2-Man Best Ball",
    round1Course: "Legend",
    round2Format: "2-Man Scramble",
    round2Course: "Legacy",
    entryFee: 50,
    prizePool: 800,
    prizeSplit: { first: 500, second: 200, third: 100 },
    teams: [
      { num: 1, p1: "Chris Statchuk", p2: "Trevor Williams" },
      { num: 2, p1: "Paul Statchuk", p2: "Chris Williams" },
      { num: 3, p1: "Tyler Perry", p2: "Mark Johnson" },
      { num: 4, p1: "Nick Crain", p2: "Keon Karamchi" },
      { num: 5, p1: "Geoff Crain", p2: "Anthony Laud" },
      { num: 6, p1: "Johnny D'amato", p2: "Nolan Rundle" },
      { num: 7, p1: "Kevin Kernohan", p2: "Steve Persa" },
      { num: 8, p1: "Adam Hoffman", p2: "Dave MacDougall" },
    ],
    leaderboard: [
      { pos: 1, team: "Statchuk/Williams", teamNum: 1, totalNet: null, toPar: null, prize: 500 },
      { pos: 2, team: "Statchuk/Williams", teamNum: 2, totalNet: null, toPar: null, prize: 200 },
      { pos: 3, team: "Perry/Johnson", teamNum: 3, totalNet: null, toPar: null, prize: 100 },
      { pos: "Last", team: "Crain/Karamchi", teamNum: 4, totalNet: null, toPar: null, prize: 0 },
    ],
    lowGross: { player: "Chris Statchuk", score: 76, toPar: 4, course: "Legend" },
    individualScores: [
      { name: "Chris Statchuk", gross: 76, toPar: 4 },
      { name: "Geoff Crain", gross: 80, toPar: 8 },
      { name: "Anthony Laud", gross: 81, toPar: 9 },
      { name: "Paul Statchuk", gross: 81, toPar: 9 },
    ],
    parimutuel: null,
  },
  2020: {
    year: 2020,
    yearNum: 3,
    name: "SGP Classic Year 3",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    date: "August 22, 2020",
    round1Format: "2-Man Best Ball",
    round1Course: "Legend",
    round2Format: "2-Man Scramble",
    round2Course: "Legend",
    entryFee: 50,
    prizePool: 1200,
    prizeSplit: { first: 720, second: 360, third: 120 },
    teams: [
      { num: 1, p1: "Bryan Gendron", p2: "Paul Statchuk" },
      { num: 2, p1: "Kevin Kernohan", p2: "Tyler Dutyshcen" },
      { num: 3, p1: "Chris Statchuk", p2: "Luke Roth" },
      { num: 4, p1: "Patrick Forbes", p2: "Gordon Leslie" },
      { num: 5, p1: "Nick Orsatti", p2: "Tyler Perry" },
      { num: 6, p1: "Tommy Frazier", p2: "Nick Crain" },
      { num: 7, p1: "Reid Hartley", p2: "Dave MacDougall" },
      { num: 8, p1: "Nolan Rundle", p2: "Brandon Mullholand" },
      { num: 9, p1: "Keon Karamchi", p2: "Andrew Carlson" },
      { num: 10, p1: "Adam Hoffman", p2: "Dave Carlson" },
      { num: 11, p1: "Brett Dutyshcen", p2: "Anthony Laud" },
      { num: 12, p1: "Geoff Crain", p2: "Graham Booth" },
    ],
    leaderboard: [
      { pos: 1, team: "Forbes/Leslie", teamNum: 4, r1Net: 63, r2Net: 63, totalNet: 126, toPar: -18, prize: 720, note: "Tournament record" },
      { pos: "T2", team: "Crain/Booth", teamNum: 12, r1Net: 65, r2Net: 66, totalNet: 131, toPar: -13, prize: 240 },
      { pos: "T2", team: "Carlson/Hoffman", teamNum: 10, r1Net: 63, r2Net: 68, totalNet: 131, toPar: -13, prize: 240 },
      { pos: "Last", team: "Mullholand/Rundle", teamNum: 8, totalNet: null, toPar: null, prize: 0 },
    ],
    lowGross: { player: "Patrick Forbes", score: 69, toPar: -3, course: "Legend" },
    individualScores: [
      { name: "Patrick Forbes", gross: 69, toPar: -3 },
      { name: "Chris Statchuk", gross: 74, toPar: 2 },
      { name: "Geoff Crain", gross: 76, toPar: 4 },
    ],
    parimutuel: null,
  },
  2021: {
    year: 2021,
    yearNum: 4,
    name: "SGP Classic Year 4",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    date: "August 14, 2021",
    round1Format: "2-Man Best Ball",
    round1Course: "Legend",
    round2Format: "2-Man Scramble",
    round2Course: "Legend",
    entryFee: 50,
    prizePool: 800,
    prizeSplit: { first: 600, second: 200 },
    teams: [
      { num: 1, p1: "Dave Carlson", p2: "Tyler Perry" },
      { num: 2, p1: "Dave MacDougall", p2: "Keon Karamchi" },
      { num: 3, p1: "Nick Crain", p2: "Adam Hoffman" },
      { num: 4, p1: "Patrick Forbes", p2: "Geoff Crain" },
      { num: 5, p1: "Trevor Williams", p2: "Andrew Carlson" },
      { num: 6, p1: "Nolan Rundle", p2: "Chris Statchuk" },
      { num: 7, p1: "Reid Hartley", p2: "Paul Statchuk" },
      { num: 8, p1: "Anthony Laud", p2: "Brendan Black" },
    ],
    leaderboard: [
      { pos: 1, team: "Laud/Black", teamNum: 8, totalNet: null, toPar: -14, prize: 600 },
      { pos: 2, team: "Hartley/Statchuk", teamNum: 7, totalNet: null, toPar: -13, prize: 200 },
      { pos: 3, team: "Williams/Carlson", teamNum: 5, totalNet: null, toPar: -10, prize: 0 },
      { pos: 4, team: "Carlson/Perry", teamNum: 1, totalNet: null, toPar: -9, prize: 0 },
      { pos: "T5", team: "MacDougall/Karamchi", teamNum: 2, totalNet: null, toPar: -8, prize: 0 },
      { pos: "T5", team: "Crain/Forbes", teamNum: 4, totalNet: null, toPar: -8, prize: 0 },
      { pos: 7, team: "Crain/Hoffman", teamNum: 3, totalNet: null, toPar: -5, prize: 0 },
      { pos: 8, team: "Rundle/Statchuk", teamNum: 6, totalNet: null, toPar: 1, prize: 0 },
    ],
    lowGross: { player: "Patrick Forbes", score: 76, toPar: 4, course: "Legend" },
    individualScores: [
      { name: "Patrick Forbes", gross: 76, toPar: 4 },
      { name: "Anthony Laud", gross: 80, toPar: 8 },
      { name: "Reid Hartley", gross: 81, toPar: 9 },
    ],
    parimutuel: {
      totalPool: 2030,
      winningTeam: 8,
      payoutMultiplier: 7.25,
      bets: [
        { bettor: "Adam Hoffman", team: 3, amount: 100 }, { bettor: "Adam Hoffman", team: 4, amount: 60 },
        { bettor: "Adam Hoffman", team: 5, amount: 20 },
        { bettor: "Andrew Carlson", team: 1, amount: 20 }, { bettor: "Andrew Carlson", team: 5, amount: 60 },
        { bettor: "Andrew Carlson", team: 8, amount: 20 },
        { bettor: "Anthony Laud", team: 7, amount: 50 }, { bettor: "Anthony Laud", team: 8, amount: 150 },
        { bettor: "Brendan Black", team: 8, amount: 50 },
        { bettor: "Chris Statchuk", team: 6, amount: 10 }, { bettor: "Chris Statchuk", team: 8, amount: 10 },
        { bettor: "Chris Statchuk", team: 7, amount: 20 },
        { bettor: "Chris Williams", team: 2, amount: 10 }, { bettor: "Chris Williams", team: 4, amount: 20 },
        { bettor: "Chris Williams", team: 7, amount: 20 },
        { bettor: "Dave Carlson", team: 1, amount: 50 }, { bettor: "Dave Carlson", team: 5, amount: 50 },
        { bettor: "Dave MacDougall", team: 2, amount: 50 }, { bettor: "Dave MacDougall", team: 1, amount: 10 },
        { bettor: "Dave MacDougall", team: 4, amount: 20 }, { bettor: "Dave MacDougall", team: 7, amount: 20 },
        { bettor: "Geoff Crain", team: 4, amount: 60 }, { bettor: "Geoff Crain", team: 7, amount: 40 },
        { bettor: "Keon Karamchi", team: 2, amount: 30 }, { bettor: "Keon Karamchi", team: 6, amount: 20 },
        { bettor: "Keon Karamchi", team: 7, amount: 20 }, { bettor: "Keon Karamchi", team: 3, amount: 20 },
        { bettor: "Nick Crain", team: 3, amount: 60 },
        { bettor: "Nolan Rundle", team: 6, amount: 10 }, { bettor: "Nolan Rundle", team: 4, amount: 10 },
        { bettor: "Patrick Forbes", team: 4, amount: 200 }, { bettor: "Patrick Forbes", team: 6, amount: 20 },
        { bettor: "Patrick Forbes", team: 1, amount: 20 }, { bettor: "Patrick Forbes", team: 2, amount: 20 },
        { bettor: "Patrick Forbes", team: 5, amount: 20 }, { bettor: "Patrick Forbes", team: 3, amount: 40 },
        { bettor: "Paul Statchuk", team: 7, amount: 250 }, { bettor: "Paul Statchuk", team: 8, amount: 50 },
        { bettor: "Reid Hartley", team: 7, amount: 200 }, { bettor: "Reid Hartley", team: 2, amount: 50 },
        { bettor: "Trevor Williams", team: 5, amount: 50 },
        { bettor: "Tyler Perry", team: 1, amount: 20 },
      ],
      results: [
        { bettor: "Anthony Laud", wagered: 200, onWinner: 150, payout: 1088, net: 888 },
        { bettor: "Brendan Black", wagered: 50, onWinner: 50, payout: 362, net: 312 },
        { bettor: "Paul Statchuk", wagered: 300, onWinner: 50, payout: 362, net: 62 },
        { bettor: "Andrew Carlson", wagered: 100, onWinner: 20, payout: 145, net: 45 },
        { bettor: "Chris Statchuk", wagered: 40, onWinner: 10, payout: 72, net: 32 },
        { bettor: "Tyler Perry", wagered: 20, onWinner: 0, payout: 0, net: -20 },
        { bettor: "Nolan Rundle", wagered: 20, onWinner: 0, payout: 0, net: -20 },
        { bettor: "Trevor Williams", wagered: 50, onWinner: 0, payout: 0, net: -50 },
        { bettor: "Chris Williams", wagered: 50, onWinner: 0, payout: 0, net: -50 },
        { bettor: "Nick Crain", wagered: 60, onWinner: 0, payout: 0, net: -60 },
        { bettor: "Keon Karamchi", wagered: 90, onWinner: 0, payout: 0, net: -90 },
        { bettor: "Geoff Crain", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Dave Carlson", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Dave MacDougall", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Adam Hoffman", wagered: 180, onWinner: 0, payout: 0, net: -180 },
        { bettor: "Reid Hartley", wagered: 250, onWinner: 0, payout: 0, net: -250 },
        { bettor: "Patrick Forbes", wagered: 320, onWinner: 0, payout: 0, net: -320 },
      ],
    },
  },
  2022: {
    year: 2022,
    yearNum: 5,
    name: "SGP Classic Year 5",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    round1Format: "2-Man Best Ball",
    round1Course: "Legend",
    round2Format: "2-Man Scramble",
    round2Course: "Legend",
    entryFee: 50,
    prizePool: 800,
    prizeSplit: { first: 600, second: 200 },
    teams: [
      { num: 1, p1: "Anthony Laud", p2: "Gordon Leslie" },
      { num: 2, p1: "Nick Crain", p2: "Brendan Black" },
      { num: 3, p1: "Geoff Crain", p2: "Adam Hoffman" },
      { num: 4, p1: "Andrew Carlson", p2: "Trevor Williams" },
      { num: 5, p1: "Mike Forbes", p2: "Nolan Rundle" },
      { num: 6, p1: "Patrick Forbes", p2: "Keon Karamchi" },
      { num: 7, p1: "Dave Carlson", p2: "Chris Statchuk" },
      { num: 8, p1: "Paul Statchuk", p2: "Dave MacDougall" },
    ],
    leaderboard: [
      { pos: 1, team: "Rundle/Forbes", teamNum: 5, r1Gross: 79, r1Net: 69, r2Gross: 66, r2Net: 60, totalGross: 145, totalNet: 129, toPar: -15, prize: 600, note: "Won in 2-hole playoff" },
      { pos: 2, team: "MacDougall/Statchuk", teamNum: 8, r1Gross: 78, r1Net: 63, r2Gross: 73, r2Net: 66, totalGross: 151, totalNet: 129, toPar: -15, prize: 200 },
      { pos: 3, team: "Karamchi/Forbes", teamNum: 6, r1Gross: 76, r1Net: 68, r2Gross: 66, r2Net: 62, totalGross: 142, totalNet: 130, toPar: -14, prize: 0 },
      { pos: "T4", team: "Statchuk/Carlson", teamNum: 7, r1Gross: 81, r1Net: 68, r2Gross: 70, r2Net: 64, totalGross: 151, totalNet: 132, toPar: -12, prize: 0 },
      { pos: "T4", team: "Carlson/Williams", teamNum: 4, r1Gross: 84, r1Net: 68, r2Gross: 73, r2Net: 64, totalGross: 157, totalNet: 132, toPar: -12, prize: 0 },
      { pos: "T6", team: "Black/Crain", teamNum: 2, r1Gross: 82, r1Net: 71, r2Gross: 68, r2Net: 63, totalGross: 150, totalNet: 134, toPar: -10, prize: 0 },
      { pos: "T6", team: "Laud/Leslie", teamNum: 1, r1Gross: 79, r1Net: 69, r2Gross: 69, r2Net: 65, totalGross: 148, totalNet: 134, toPar: -10, prize: 0 },
      { pos: 8, team: "Crain/Hoffman", teamNum: 3, r1Gross: 80, r1Net: 72, r2Gross: 67, r2Net: 63, totalGross: 147, totalNet: 135, toPar: -9, prize: 0 },
    ],
    lowGross: { player: "Patrick Forbes", score: 77, toPar: 5, course: "Legend" },
    individualScores: [
      { name: "Patrick Forbes", hdcp: 3, gross: 77, net: 74, toPar: 5, netToPar: 2, birdies: 2, eagles: 0, front: 37, back: 40 },
      { name: "Paul Statchuk", hdcp: 10, gross: 81, net: 71, toPar: 9, netToPar: -1, birdies: 1, eagles: 0, front: 39, back: 42 },
      { name: "Mike Forbes", hdcp: 5, gross: 81, net: 76, toPar: 9, netToPar: 4, birdies: 1, eagles: 0, front: 43, back: 38 },
      { name: "Chris Statchuk", hdcp: 5, gross: 81, net: 76, toPar: 9, netToPar: 4, birdies: 1, eagles: 0, front: 41, back: 40 },
      { name: "Anthony Laud", hdcp: 9, gross: 83, net: 74, toPar: 11, netToPar: 2, birdies: 1, eagles: 0, front: 43, back: 40 },
      { name: "Brendan Black", hdcp: 11, gross: 85, net: 74, toPar: 13, netToPar: 2, birdies: 1, eagles: 0, front: 40, back: 45 },
      { name: "Geoff Crain", hdcp: 6, gross: 85, net: 79, toPar: 13, netToPar: 7, birdies: 0, eagles: 0, front: 38, back: 47 },
      { name: "Trevor Williams", hdcp: 15, gross: 86, net: 71, toPar: 14, netToPar: -1, birdies: 1, eagles: 0, front: 43, back: 43 },
      { name: "Nick Crain", hdcp: 9, gross: 92, net: 83, toPar: 20, netToPar: 11, birdies: 0, eagles: 0, front: 48, back: 44 },
      { name: "Keon Karamchi", hdcp: 20, gross: 93, net: 73, toPar: 21, netToPar: 1, birdies: 0, eagles: 0, front: 44, back: 49 },
      { name: "Gordon Leslie", hdcp: 10, gross: 95, net: 85, toPar: 23, netToPar: 13, birdies: 0, eagles: 0, front: 50, back: 45 },
      { name: "Dave MacDougall", hdcp: 23, gross: 99, net: 76, toPar: 27, netToPar: 4, birdies: 0, eagles: 0, front: 48, back: 51 },
      { name: "Adam Hoffman", hdcp: 12, gross: 100, net: 88, toPar: 28, netToPar: 16, birdies: 0, eagles: 0, front: 54, back: 46 },
      { name: "Dave Carlson", hdcp: 29, gross: 104, net: 75, toPar: 32, netToPar: 3, birdies: 0, eagles: 0, front: 53, back: 51 },
      { name: "Nolan Rundle", hdcp: 25, gross: 106, net: 81, toPar: 34, netToPar: 9, birdies: 1, eagles: 0, front: 57, back: 49 },
      { name: "Andrew Carlson", hdcp: 27, gross: 109, net: 82, toPar: 37, netToPar: 10, birdies: 0, eagles: 0, front: 59, back: 50 },
    ],
    parimutuel: {
      totalPool: 2185,
      winningTeam: 5,
      payoutMultiplier: 21.85,
      bets: [
        { bettor: "Adam Hoffman", team: 1, amount: 10 }, { bettor: "Adam Hoffman", team: 2, amount: 10 },
        { bettor: "Adam Hoffman", team: 3, amount: 10 }, { bettor: "Adam Hoffman", team: 4, amount: 10 },
        { bettor: "Adam Hoffman", team: 5, amount: 20 }, { bettor: "Adam Hoffman", team: 6, amount: 10 },
        { bettor: "Adam Hoffman", team: 7, amount: 30 }, { bettor: "Adam Hoffman", team: 8, amount: 10 },
        { bettor: "Andrew Carlson", team: 1, amount: 25 }, { bettor: "Andrew Carlson", team: 4, amount: 25 },
        { bettor: "Andrew Carlson", team: 6, amount: 50 }, { bettor: "Andrew Carlson", team: 7, amount: 50 },
        { bettor: "Anthony Laud", team: 1, amount: 200 }, { bettor: "Anthony Laud", team: 6, amount: 50 },
        { bettor: "Brendan Black", team: 2, amount: 100 }, { bettor: "Brendan Black", team: 1, amount: 25 },
        { bettor: "Brendan Black", team: 6, amount: 25 },
        { bettor: "Chris Statchuk", team: 7, amount: 100 }, { bettor: "Chris Statchuk", team: 8, amount: 50 },
        { bettor: "Chris Statchuk", team: 6, amount: 50 },
        { bettor: "Dave MacDougall", team: 8, amount: 75 }, { bettor: "Dave MacDougall", team: 6, amount: 25 },
        { bettor: "Dave MacDougall", team: 7, amount: 20 },
        { bettor: "David Carlson", team: 6, amount: 25 }, { bettor: "David Carlson", team: 4, amount: 25 },
        { bettor: "David Carlson", team: 7, amount: 75 },
        { bettor: "Geoff Crain", team: 6, amount: 50 },
        { bettor: "Keon Karamchi", team: 6, amount: 100 }, { bettor: "Keon Karamchi", team: 7, amount: 50 },
        { bettor: "Mike Forbes", team: 2, amount: 20 }, { bettor: "Mike Forbes", team: 5, amount: 60 },
        { bettor: "Mike Forbes", team: 6, amount: 20 },
        { bettor: "Nolan Rundle", team: 1, amount: 20 }, { bettor: "Nolan Rundle", team: 5, amount: 20 },
        { bettor: "Nolan Rundle", team: 6, amount: 40 },
        { bettor: "Patrick Forbes", team: 6, amount: 200 }, { bettor: "Patrick Forbes", team: 7, amount: 50 },
        { bettor: "Patrick Forbes", team: 1, amount: 25 },
        { bettor: "Paul Statchuk", team: 8, amount: 200 }, { bettor: "Paul Statchuk", team: 7, amount: 100 },
        { bettor: "Paul Statchuk", team: 1, amount: 50 }, { bettor: "Paul Statchuk", team: 2, amount: 50 },
        { bettor: "Trevor Williams", team: 4, amount: 25 },
      ],
      results: [
        { bettor: "Mike Forbes", wagered: 100, onWinner: 60, payout: 1311, net: 1211 },
        { bettor: "Nolan Rundle", wagered: 80, onWinner: 20, payout: 437, net: 357 },
        { bettor: "Adam Hoffman", wagered: 110, onWinner: 20, payout: 437, net: 327 },
        { bettor: "Trevor Williams", wagered: 25, onWinner: 0, payout: 0, net: -25 },
        { bettor: "Geoff Crain", wagered: 50, onWinner: 0, payout: 0, net: -50 },
        { bettor: "Dave MacDougall", wagered: 120, onWinner: 0, payout: 0, net: -120 },
        { bettor: "David Carlson", wagered: 125, onWinner: 0, payout: 0, net: -125 },
        { bettor: "Keon Karamchi", wagered: 150, onWinner: 0, payout: 0, net: -150 },
        { bettor: "Brendan Black", wagered: 150, onWinner: 0, payout: 0, net: -150 },
        { bettor: "Andrew Carlson", wagered: 150, onWinner: 0, payout: 0, net: -150 },
        { bettor: "Chris Statchuk", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Anthony Laud", wagered: 250, onWinner: 0, payout: 0, net: -250 },
        { bettor: "Patrick Forbes", wagered: 275, onWinner: 0, payout: 0, net: -275 },
        { bettor: "Paul Statchuk", wagered: 400, onWinner: 0, payout: 0, net: -400 },
      ],
    },
  },
  2023: {
    year: 2023,
    yearNum: 6,
    name: "SGP Classic Year 6",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    round1Format: "2-Man Best Ball",
    round1Course: "Legacy",
    round2Format: "2-Man Scramble",
    round2Course: "Legend",
    entryFee: 50,
    prizePool: 800,
    prizeSplit: { first: 600, second: 200 },
    teams: [
      { num: 1, p1: "Dave Carlson", p2: "Adam Hoffman" },
      { num: 2, p1: "Anthony Laud", p2: "Nick Crain" },
      { num: 3, p1: "Reid Hartley", p2: "Paul Statchuk" },
      { num: 4, p1: "Nolan Rundle", p2: "Brendan Black" },
      { num: 5, p1: "Andrew Carlson", p2: "Graham Booth" },
      { num: 6, p1: "Kevin Kernohan", p2: "Trevor Williams" },
      { num: 7, p1: "Dave MacDougall", p2: "Keon Karamchi" },
      { num: 8, p1: "Chris Williams", p2: "Chris Statchuk" },
    ],
    leaderboard: [
      { pos: 1, team: "MacDougall/Karamchi", teamNum: 7, r1Gross: 80, r1Net: 61, r2Gross: 73, r2Net: 64, totalGross: 153, totalNet: 125, toPar: -19, prize: 600 },
      { pos: "T2", team: "Statchuk/Hartley", teamNum: 3, r1Gross: 73, r1Net: 65, r2Gross: 69, r2Net: 67, totalGross: 142, totalNet: 132, toPar: -12, prize: 100 },
      { pos: "T2", team: "Laud/Crain", teamNum: 2, r1Gross: 73, r1Net: 65, r2Gross: 71, r2Net: 67, totalGross: 144, totalNet: 132, toPar: -12, prize: 100 },
      { pos: "T4", team: "Black/Rundle", teamNum: 4, r1Gross: 86, r1Net: 69, r2Gross: 72, r2Net: 65, totalGross: 158, totalNet: 134, toPar: -10, prize: 0 },
      { pos: "T4", team: "Williams/Kernohan", teamNum: 6, r1Gross: 82, r1Net: 67, r2Gross: 75, r2Net: 67, totalGross: 157, totalNet: 134, toPar: -10, prize: 0 },
      { pos: 6, team: "Statchuk/Williams", teamNum: 8, r1Gross: 72, r1Net: 68, r2Gross: 69, r2Net: 67, totalGross: 141, totalNet: 135, toPar: -9, prize: 0 },
      { pos: 7, team: "Carlson/Booth", teamNum: 5, r1Gross: 85, r1Net: 67, r2Gross: 78, r2Net: 69, totalGross: 163, totalNet: 136, toPar: -8, prize: 0 },
      { pos: 8, team: "Carlson/Hoffman", teamNum: 1, r1Gross: 89, r1Net: 69, r2Gross: 76, r2Net: 68, totalGross: 165, totalNet: 137, toPar: -7, prize: 0 },
    ],
    lowGross: { player: "Reid Hartley", score: 77, toPar: 5, course: "Legacy" },
    individualScores: [
      { name: "Reid Hartley", hdcp: 3, gross: 77, net: 74, toPar: 5, netToPar: 2, birdies: 1, eagles: 0, front: 41, back: 36 },
      { name: "Paul Statchuk", hdcp: 8, gross: 78, net: 70, toPar: 6, netToPar: -2, birdies: 4, eagles: 0, front: 43, back: 35 },
      { name: "Chris Statchuk", hdcp: 3, gross: 78, net: 75, toPar: 6, netToPar: 3, birdies: 1, eagles: 0, front: 39, back: 39 },
      { name: "Chris Williams", hdcp: 5, gross: 79, net: 74, toPar: 7, netToPar: 2, birdies: 0, eagles: 0, front: 39, back: 40 },
      { name: "Anthony Laud", hdcp: 10, gross: 79, net: 69, toPar: 7, netToPar: -3, birdies: 2, eagles: 0, front: 39, back: 40 },
      { name: "Brendan Black", hdcp: 8, gross: 87, net: 79, toPar: 15, netToPar: 7, birdies: 1, eagles: 0, front: 44, back: 43 },
      { name: "Nick Crain", hdcp: 7, gross: 87, net: 80, toPar: 15, netToPar: 8, birdies: 2, eagles: 0, front: 46, back: 41 },
      { name: "Dave MacDougall", hdcp: 19, gross: 89, net: 70, toPar: 17, netToPar: -2, birdies: 1, eagles: 0, front: 46, back: 43 },
      { name: "Keon Karamchi", hdcp: 16, gross: 90, net: 74, toPar: 18, netToPar: 2, birdies: 1, eagles: 0, front: 47, back: 43 },
      { name: "Graham Booth", hdcp: 13, gross: 91, net: 78, toPar: 19, netToPar: 6, birdies: 1, eagles: 0, front: 51, back: 40 },
      { name: "Kevin Kernohan", hdcp: 17, gross: 92, net: 75, toPar: 20, netToPar: 3, birdies: 1, eagles: 0, front: 48, back: 44 },
      { name: "Trevor Williams", hdcp: 14, gross: 92, net: 78, toPar: 20, netToPar: 6, birdies: 0, eagles: 0, front: 48, back: 44 },
      { name: "Adam Hoffman", hdcp: 11, gross: 93, net: 82, toPar: 21, netToPar: 10, birdies: 0, eagles: 0, front: 50, back: 43 },
      { name: "Andrew Carlson", hdcp: 24, gross: 99, net: 75, toPar: 27, netToPar: 3, birdies: 0, eagles: 0, front: 50, back: 49 },
      { name: "Nolan Rundle", hdcp: 23, gross: 100, net: 77, toPar: 28, netToPar: 5, birdies: 0, eagles: 0, front: 50, back: 50 },
      { name: "Dave Carlson", hdcp: 24, gross: 101, net: 77, toPar: 29, netToPar: 5, birdies: 0, eagles: 0, front: 53, back: 48 },
    ],
    parimutuel: {
      totalPool: 3355,
      winningTeam: 7,
      payoutMultiplier: 14.91,
      bets: [
        { bettor: "Adam Hoffman", team: 1, amount: 100 }, { bettor: "Adam Hoffman", team: 2, amount: 10 },
        { bettor: "Adam Hoffman", team: 3, amount: 30 }, { bettor: "Adam Hoffman", team: 4, amount: 30 },
        { bettor: "Adam Hoffman", team: 5, amount: 10 }, { bettor: "Adam Hoffman", team: 6, amount: 20 },
        { bettor: "Adam Hoffman", team: 7, amount: 10 }, { bettor: "Adam Hoffman", team: 8, amount: 10 },
        { bettor: "Andrew Carlson", team: 5, amount: 60 }, { bettor: "Andrew Carlson", team: 1, amount: 20 },
        { bettor: "Andrew Carlson", team: 3, amount: 20 }, { bettor: "Andrew Carlson", team: 6, amount: 20 },
        { bettor: "Anthony Laud", team: 2, amount: 200 }, { bettor: "Anthony Laud", team: 6, amount: 75 },
        { bettor: "Brendan Black", team: 4, amount: 50 }, { bettor: "Brendan Black", team: 3, amount: 35 },
        { bettor: "Brendan Black", team: 7, amount: 20 }, { bettor: "Brendan Black", team: 2, amount: 20 },
        { bettor: "Chris Statchuk", team: 8, amount: 50 }, { bettor: "Chris Statchuk", team: 3, amount: 50 },
        { bettor: "Chris Statchuk", team: 7, amount: 25 }, { bettor: "Chris Statchuk", team: 6, amount: 25 },
        { bettor: "Chris Williams", team: 8, amount: 50 }, { bettor: "Chris Williams", team: 3, amount: 20 },
        { bettor: "Chris Williams", team: 6, amount: 15 }, { bettor: "Chris Williams", team: 4, amount: 15 },
        { bettor: "Dave Carlson", team: 1, amount: 50 }, { bettor: "Dave Carlson", team: 6, amount: 25 },
        { bettor: "Dave MacDougall", team: 7, amount: 75 }, { bettor: "Dave MacDougall", team: 2, amount: 30 },
        { bettor: "Dave MacDougall", team: 3, amount: 20 }, { bettor: "Dave MacDougall", team: 4, amount: 20 },
        { bettor: "Dave MacDougall", team: 8, amount: 30 },
        { bettor: "Geoff Crain", team: 2, amount: 60 }, { bettor: "Geoff Crain", team: 6, amount: 60 },
        { bettor: "Geoff Dusse", team: 3, amount: 50 }, { bettor: "Geoff Dusse", team: 6, amount: 75 },
        { bettor: "Geoff Dusse", team: 8, amount: 75 },
        { bettor: "Graham Booth", team: 8, amount: 15 }, { bettor: "Graham Booth", team: 5, amount: 15 },
        { bettor: "Graham Booth", team: 3, amount: 15 },
        { bettor: "Hoff Father In Law", team: 1, amount: 100 },
        { bettor: "Keon Karamchi", team: 7, amount: 75 }, { bettor: "Keon Karamchi", team: 1, amount: 50 },
        { bettor: "Keon Karamchi", team: 6, amount: 100 }, { bettor: "Keon Karamchi", team: 8, amount: 100 },
        { bettor: "Kevin Kernohan", team: 6, amount: 200 },
        { bettor: "Nick Crain", team: 2, amount: 100 },
        { bettor: "Nolan Rundle", team: 4, amount: 50 }, { bettor: "Nolan Rundle", team: 3, amount: 35 },
        { bettor: "Nolan Rundle", team: 7, amount: 20 }, { bettor: "Nolan Rundle", team: 2, amount: 20 },
        { bettor: "Paul Statchuk", team: 4, amount: 25 }, { bettor: "Paul Statchuk", team: 6, amount: 25 },
        { bettor: "Paul Statchuk", team: 8, amount: 50 }, { bettor: "Paul Statchuk", team: 3, amount: 400 },
        { bettor: "Reid Hartley", team: 3, amount: 400 },
      ],
      results: [
        { bettor: "Dave MacDougall", wagered: 175, onWinner: 75, payout: 1118, net: 943 },
        { bettor: "Keon Karamchi", wagered: 325, onWinner: 75, payout: 1118, net: 793 },
        { bettor: "Chris Statchuk", wagered: 150, onWinner: 25, payout: 373, net: 223 },
        { bettor: "Brendan Black", wagered: 125, onWinner: 20, payout: 298, net: 173 },
        { bettor: "Nolan Rundle", wagered: 125, onWinner: 20, payout: 298, net: 173 },
        { bettor: "Adam Hoffman", wagered: 220, onWinner: 10, payout: 149, net: -71 },
        { bettor: "Graham Booth", wagered: 45, onWinner: 0, payout: 0, net: -45 },
        { bettor: "Dave Carlson", wagered: 75, onWinner: 0, payout: 0, net: -75 },
        { bettor: "Nick Crain", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Chris Williams", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Hoff Father In Law", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Andrew Carlson", wagered: 120, onWinner: 0, payout: 0, net: -120 },
        { bettor: "Geoff Crain", wagered: 120, onWinner: 0, payout: 0, net: -120 },
        { bettor: "Geoff Dusse", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Kevin Kernohan", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Anthony Laud", wagered: 275, onWinner: 0, payout: 0, net: -275 },
        { bettor: "Reid Hartley", wagered: 400, onWinner: 0, payout: 0, net: -400 },
        { bettor: "Paul Statchuk", wagered: 500, onWinner: 0, payout: 0, net: -500 },
      ],
    },
  },
  2024: {
    year: 2024,
    yearNum: 7,
    name: "SGP Classic Year 7",
    venue: "Redcrest Golf Club",
    location: "Newmarket, ON",
    round1Format: "2-Man Best Ball",
    round1Course: "Redcrest",
    round2Format: "2-Man Scramble",
    round2Course: "Redcrest",
    entryFee: 50,
    prizePool: 800,
    prizeSplit: { first: 600, second: 200 },
    teams: [
      { num: 1, p1: "Keon Karamchi", p2: "Joel Greaves" },
      { num: 2, p1: "Adam Hoffman", p2: "Dave MacDougall" },
      { num: 3, p1: "Geoff Crain", p2: "Nick Crain" },
      { num: 4, p1: "Chris Statchuk", p2: "Nolan Rundle" },
      { num: 5, p1: "Reid Hartley", p2: "Brendan Black" },
      { num: 6, p1: "Anthony Laud", p2: "Mark Johnson" },
      { num: 7, p1: "Paul Statchuk", p2: "Dave Carlson" },
      { num: 8, p1: "Trevor Williams", p2: "Kevin Kernohan" },
    ],
    leaderboard: [
      { pos: 1, team: "Statchuk/Carlson", teamNum: 7, r1Gross: 77, r1Net: 61, r2Gross: 71, r2Net: 63, totalGross: 148, totalNet: 124, toPar: -18, prize: 600 },
      { pos: 2, team: "Statchuk/Rundle", teamNum: 4, r1Gross: 73, r1Net: 62, r2Gross: 69, r2Net: 64, totalGross: 142, totalNet: 126, toPar: -16, prize: 200 },
      { pos: "T3", team: "Williams/Kernohan", teamNum: 8, r1Gross: 82, r1Net: 66, r2Gross: 70, r2Net: 62, totalGross: 152, totalNet: 128, toPar: -14, prize: 0 },
      { pos: "T3", team: "Laud/Johnson", teamNum: 6, r1Gross: 82, r1Net: 62, r2Gross: 74, r2Net: 66, totalGross: 156, totalNet: 128, toPar: -14, prize: 0 },
      { pos: 5, team: "Crain/Crain", teamNum: 3, r1Gross: 72, r1Net: 65, r2Gross: 67, r2Net: 64, totalGross: 139, totalNet: 129, toPar: -13, prize: 0 },
      { pos: "T6", team: "Karamchi/Greaves", teamNum: 1, r1Gross: 93, r1Net: 72, r2Gross: 71, r2Net: 61, totalGross: 164, totalNet: 133, toPar: -9, prize: 0 },
      { pos: "T6", team: "MacDougall/Hoffman", teamNum: 2, r1Gross: 82, r1Net: 67, r2Gross: 73, r2Net: 66, totalGross: 155, totalNet: 133, toPar: -9, prize: 0 },
      { pos: 8, team: "Black/Hartley", teamNum: 5, r1Gross: 77, r1Net: 70, r2Gross: 68, r2Net: 65, totalGross: 145, totalNet: 135, toPar: -7, prize: 0 },
    ],
    lowGross: { player: "Chris Statchuk", score: 75, toPar: 4, course: "Redcrest" },
    individualScores: [
      { name: "Chris Statchuk", hdcp: 3, gross: 75, net: 72, toPar: 4, netToPar: 1, birdies: 2, eagles: 0, front: 38, back: 37 },
      { name: "Geoff Crain", hdcp: 4, gross: 78, net: 74, toPar: 7, netToPar: 3, birdies: 1, eagles: 0, front: 37, back: 41 },
      { name: "Paul Statchuk", hdcp: 12, gross: 78, net: 66, toPar: 7, netToPar: -5, birdies: 0, eagles: 0, front: 39, back: 39 },
      { name: "Reid Hartley", hdcp: 4, gross: 80, net: 76, toPar: 9, netToPar: 5, birdies: 0, eagles: 0, front: 39, back: 41 },
      { name: "Nick Crain", hdcp: 7, gross: 83, net: 76, toPar: 12, netToPar: 5, birdies: 1, eagles: 0, front: 44, back: 39 },
      { name: "Kevin Kernohan", hdcp: 16, gross: 90, net: 74, toPar: 19, netToPar: 3, birdies: 1, eagles: 0, front: 43, back: 47 },
      { name: "Adam Hoffman", hdcp: 12, gross: 91, net: 79, toPar: 20, netToPar: 8, birdies: 0, eagles: 0, front: 50, back: 41 },
      { name: "Brendan Black", hdcp: 8, gross: 92, net: 84, toPar: 21, netToPar: 13, birdies: 0, eagles: 0, front: 45, back: 47 },
      { name: "Trevor Williams", hdcp: 15, gross: 92, net: 77, toPar: 21, netToPar: 6, birdies: 1, eagles: 0, front: 48, back: 44 },
      { name: "Anthony Laud", hdcp: 12, gross: 94, net: 82, toPar: 23, netToPar: 11, birdies: 1, eagles: 0, front: 47, back: 47 },
      { name: "Dave MacDougall", hdcp: 18, gross: 94, net: 76, toPar: 23, netToPar: 5, birdies: 0, eagles: 0, front: 45, back: 49 },
      { name: "Mark Johnson", hdcp: 25, gross: 96, net: 71, toPar: 25, netToPar: 0, birdies: 1, eagles: 0, front: 45, back: 51 },
      { name: "Dave Carlson", hdcp: 25, gross: 97, net: 72, toPar: 26, netToPar: 1, birdies: 1, eagles: 0, front: 47, back: 50 },
      { name: "Nolan Rundle", hdcp: 26, gross: 99, net: 73, toPar: 28, netToPar: 2, birdies: 2, eagles: 0, front: 53, back: 46 },
      { name: "Keon Karamchi", hdcp: 17, gross: 99, net: 82, toPar: 28, netToPar: 11, birdies: 0, eagles: 0, front: 51, back: 48 },
      { name: "Joel Greaves", hdcp: 24, gross: 102, net: 78, toPar: 31, netToPar: 7, birdies: 0, eagles: 0, front: 54, back: 48 },
    ],
    parimutuel: {
      totalPool: 3760,
      winningTeam: 7,
      payoutMultiplier: 5.12,
      bets: [
        { bettor: "Adam Hoffman", team: 1, amount: 10 }, { bettor: "Andrew Carlson", team: 1, amount: 25 },
        { bettor: "Geoff Crain", team: 1, amount: 30 }, { bettor: "Geoff Dusse", team: 1, amount: 50 },
        { bettor: "Joel Greaves", team: 1, amount: 50 }, { bettor: "Keon Karamchi", team: 1, amount: 75 },
        { bettor: "Mark Johnson", team: 1, amount: 25 }, { bettor: "Nolan Rundle", team: 1, amount: 30 },
        { bettor: "Adam Hoffman", team: 2, amount: 150 }, { bettor: "Andrew Carlson", team: 2, amount: 50 },
        { bettor: "Brendan Black", team: 2, amount: 30 }, { bettor: "Dave MacDougall", team: 2, amount: 150 },
        { bettor: "Keon Karamchi", team: 2, amount: 125 }, { bettor: "Mark Johnson", team: 2, amount: 10 },
        { bettor: "Reid Hartley", team: 2, amount: 30 },
        { bettor: "Adam Hoffman", team: 3, amount: 10 }, { bettor: "Chris Statchuk", team: 3, amount: 20 },
        { bettor: "Dave MacDougall", team: 3, amount: 10 }, { bettor: "Geoff Crain", team: 3, amount: 40 },
        { bettor: "Mark Johnson", team: 3, amount: 10 }, { bettor: "Nick Crain", team: 3, amount: 50 },
        { bettor: "Nolan Rundle", team: 3, amount: 20 },
        { bettor: "Adam Hoffman", team: 4, amount: 40 }, { bettor: "Chris Statchuk", team: 4, amount: 30 },
        { bettor: "Dave MacDougall", team: 4, amount: 20 }, { bettor: "Geoff Crain", team: 4, amount: 30 },
        { bettor: "Geoff Dusse", team: 4, amount: 75 }, { bettor: "Keon Karamchi", team: 4, amount: 100 },
        { bettor: "Mark Johnson", team: 4, amount: 25 }, { bettor: "Nolan Rundle", team: 4, amount: 100 },
        { bettor: "Paul Statchuk", team: 4, amount: 100 }, { bettor: "Trevor Williams", team: 4, amount: 10 },
        { bettor: "Adam Hoffman", team: 5, amount: 30 }, { bettor: "Brendan Black", team: 5, amount: 60 },
        { bettor: "Chris Statchuk", team: 5, amount: 30 }, { bettor: "Keon Karamchi", team: 5, amount: 50 },
        { bettor: "Mark Johnson", team: 5, amount: 10 }, { bettor: "Nolan Rundle", team: 5, amount: 20 },
        { bettor: "Paul Statchuk", team: 5, amount: 50 }, { bettor: "Reid Hartley", team: 5, amount: 60 },
        { bettor: "Adam Hoffman", team: 6, amount: 10 }, { bettor: "Anthony Laud", team: 6, amount: 200 },
        { bettor: "Brendan Black", team: 6, amount: 30 }, { bettor: "Chris Statchuk", team: 6, amount: 10 },
        { bettor: "Dave MacDougall", team: 6, amount: 20 }, { bettor: "Geoff Dusse", team: 6, amount: 75 },
        { bettor: "Kevin Kernohan", team: 6, amount: 100 }, { bettor: "Mark Johnson", team: 6, amount: 200 },
        { bettor: "Paul Statchuk", team: 6, amount: 100 }, { bettor: "Reid Hartley", team: 6, amount: 30 },
        { bettor: "Adam Hoffman", team: 7, amount: 30 }, { bettor: "Andrew Carlson", team: 7, amount: 25 },
        { bettor: "Brendan Black", team: 7, amount: 30 }, { bettor: "Chris Statchuk", team: 7, amount: 30 },
        { bettor: "Dave Carlson", team: 7, amount: 150 }, { bettor: "Kevin Kernohan", team: 7, amount: 100 },
        { bettor: "Mark Johnson", team: 7, amount: 10 }, { bettor: "Nolan Rundle", team: 7, amount: 30 },
        { bettor: "Paul Statchuk", team: 7, amount: 300 }, { bettor: "Reid Hartley", team: 7, amount: 30 },
        { bettor: "Adam Hoffman", team: 8, amount: 20 }, { bettor: "Anthony Laud", team: 8, amount: 100 },
        { bettor: "Kevin Kernohan", team: 8, amount: 200 }, { bettor: "Mark Johnson", team: 8, amount: 60 },
        { bettor: "Trevor Williams", team: 8, amount: 30 },
      ],
      results: [
        { bettor: "Paul Statchuk", wagered: 550, onWinner: 300, payout: 1535, net: 985 },
        { bettor: "Dave Carlson", wagered: 150, onWinner: 150, payout: 767, net: 617 },
        { bettor: "Kevin Kernohan", wagered: 400, onWinner: 100, payout: 512, net: 112 },
        { bettor: "Chris Statchuk", wagered: 120, onWinner: 30, payout: 153, net: 33 },
        { bettor: "Andrew Carlson", wagered: 100, onWinner: 25, payout: 128, net: 28 },
        { bettor: "Brendan Black", wagered: 150, onWinner: 30, payout: 153, net: 3 },
        { bettor: "Reid Hartley", wagered: 150, onWinner: 30, payout: 153, net: 3 },
        { bettor: "Trevor Williams", wagered: 40, onWinner: 0, payout: 0, net: -40 },
        { bettor: "Nolan Rundle", wagered: 200, onWinner: 30, payout: 153, net: -47 },
        { bettor: "Joel Greaves", wagered: 50, onWinner: 0, payout: 0, net: -50 },
        { bettor: "Nick Crain", wagered: 50, onWinner: 0, payout: 0, net: -50 },
        { bettor: "Geoff Crain", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Adam Hoffman", wagered: 300, onWinner: 30, payout: 153, net: -147 },
        { bettor: "Dave MacDougall", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Geoff Dusse", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Mark Johnson", wagered: 350, onWinner: 10, payout: 51, net: -299 },
        { bettor: "Anthony Laud", wagered: 300, onWinner: 0, payout: 0, net: -300 },
        { bettor: "Keon Karamchi", wagered: 350, onWinner: 0, payout: 0, net: -350 },
      ],
    },
  },
  2025: {
    year: 2025,
    yearNum: 8,
    name: "SGP Classic Year 8",
    venue: "Woodington Lake Golf Club",
    location: "Tottenham, ON",
    round1Format: "2-Man Best Ball",
    round1Course: "Legacy",
    round2Format: "2-Man Scramble",
    round2Course: "Legend",
    entryFee: 60,
    prizePool: 960,
    prizeSplit: { first: 720, second: 240 },
    teams: [
      { num: 1, p1: "Reid Hartley", p2: "Brendan Black" },
      { num: 2, p1: "Nick Crain", p2: "Keon Karamchi" },
      { num: 3, p1: "Mark Johnson", p2: "Roscoe Statchuk" },
      { num: 4, p1: "David Carlson", p2: "Chris Statchuk" },
      { num: 5, p1: "Geoff Crain", p2: "Anthony Laud" },
      { num: 6, p1: "Nolan Rundle", p2: "Andrew Carlson" },
      { num: 7, p1: "Adam Hoffman", p2: "Kevin Kernohan" },
      { num: 8, p1: "Dave MacDougall", p2: "Paul Statchuk" },
    ],
    leaderboard: [
      { pos: 1, team: "Hartley/Black", teamNum: 1, r1Gross: 69, r1Net: 63, r2Gross: 62, r2Net: 60, totalGross: 131, totalNet: 123, toPar: -21, prize: 720 },
      { pos: 2, team: "MacDougall/Statchuk", teamNum: 8, r1Gross: 74, r1Net: 61, r2Gross: 69, r2Net: 63, totalGross: 143, totalNet: 124, toPar: -20, prize: 240 },
      { pos: 3, team: "Statchuk/Carlson", teamNum: 4, r1Gross: 73, r1Net: 64, r2Gross: 67, r2Net: 62, totalGross: 140, totalNet: 126, toPar: -18, prize: 0 },
      { pos: 4, team: "Johnson/Statchuk", teamNum: 3, r1Gross: 84, r1Net: 62, r2Gross: 81, r2Net: 69, totalGross: 165, totalNet: 131, toPar: -13, prize: 0 },
      { pos: "T5", team: "Hoffman/Kernohan", teamNum: 7, r1Gross: 78, r1Net: 65, r2Gross: 74, r2Net: 68, totalGross: 152, totalNet: 133, toPar: -11, prize: 0 },
      { pos: "T5", team: "Carlson/Rundle", teamNum: 6, r1Gross: 91, r1Net: 67, r2Gross: 78, r2Net: 66, totalGross: 169, totalNet: 133, toPar: -11, prize: 0 },
      { pos: 7, team: "Laud/Crain", teamNum: 5, r1Gross: 73, r1Net: 68, r2Gross: 70, r2Net: 67, totalGross: 143, totalNet: 135, toPar: -9, prize: 0 },
      { pos: 8, team: "Karamchi/Crain", teamNum: 2, r1Gross: 82, r1Net: 71, r2Gross: 72, r2Net: 66, totalGross: 154, totalNet: 137, toPar: -7, prize: 0 },
    ],
    lowGross: { player: "Reid Hartley", score: 75, toPar: 3, course: "Legacy" },
    individualScores: [
      { name: "Reid Hartley", hdcp: 2, gross: 75, net: 73, toPar: 3, netToPar: 1, birdies: 4, eagles: 0, front: 38, back: 37 },
      { name: "Brendan Black", hdcp: 7, gross: 76, net: 69, toPar: 4, netToPar: -3, birdies: 1, eagles: 0, front: 39, back: 37 },
      { name: "Paul Statchuk", hdcp: 7, gross: 77, net: 70, toPar: 5, netToPar: -2, birdies: 2, eagles: 0, front: 41, back: 36 },
      { name: "Chris Statchuk", hdcp: 4, gross: 77, net: 73, toPar: 5, netToPar: 1, birdies: 3, eagles: 0, front: 38, back: 39 },
      { name: "Anthony Laud", hdcp: 7, gross: 83, net: 76, toPar: 11, netToPar: 4, birdies: 2, eagles: 1, front: 40, back: 43 },
      { name: "Geoff Crain", hdcp: 3, gross: 85, net: 82, toPar: 13, netToPar: 10, birdies: 1, eagles: 0, front: 43, back: 42 },
      { name: "Adam Hoffman", hdcp: 10, gross: 86, net: 76, toPar: 14, netToPar: 4, birdies: 0, eagles: 0, front: 41, back: 45 },
      { name: "Kevin Kernohan", hdcp: 13, gross: 86, net: 73, toPar: 14, netToPar: 1, birdies: 3, eagles: 0, front: 40, back: 46 },
      { name: "Keon Karamchi", hdcp: 13, gross: 90, net: 77, toPar: 18, netToPar: 5, birdies: 1, eagles: 0, front: 45, back: 45 },
      { name: "Roscoe Statchuk", hdcp: 22, gross: 92, net: 70, toPar: 20, netToPar: -2, birdies: 1, eagles: 0, front: 48, back: 44 },
      { name: "Nick Crain", hdcp: 10, gross: 93, net: 83, toPar: 21, netToPar: 11, birdies: 1, eagles: 0, front: 47, back: 46 },
      { name: "Dave MacDougall", hdcp: 17, gross: 96, net: 79, toPar: 24, netToPar: 7, birdies: 1, eagles: 0, front: 50, back: 46 },
      { name: "David Carlson", hdcp: 23, gross: 102, net: 79, toPar: 30, netToPar: 7, birdies: 0, eagles: 0, front: 54, back: 48 },
      { name: "Mark Johnson", hdcp: 22, gross: 103, net: 81, toPar: 31, netToPar: 9, birdies: 2, eagles: 0, front: 51, back: 52 },
      { name: "Nolan Rundle", hdcp: 21, gross: 106, net: 85, toPar: 34, netToPar: 13, birdies: 0, eagles: 0, front: 50, back: 56 },
      { name: "Andrew Carlson", hdcp: 25, gross: 108, net: 83, toPar: 36, netToPar: 11, birdies: 0, eagles: 0, front: 54, back: 54 },
    ],
    parimutuel: {
      totalPool: 3500,
      winningTeam: 1,
      payoutMultiplier: 9.86,
      bets: [
        { bettor: "Adam Hoffman", team: 1, amount: 10 }, { bettor: "Adam Hoffman", team: 2, amount: 20 },
        { bettor: "Adam Hoffman", team: 3, amount: 40 }, { bettor: "Adam Hoffman", team: 4, amount: 20 },
        { bettor: "Adam Hoffman", team: 5, amount: 30 }, { bettor: "Adam Hoffman", team: 6, amount: 30 },
        { bettor: "Adam Hoffman", team: 7, amount: 150 }, { bettor: "Adam Hoffman", team: 8, amount: 50 },
        { bettor: "Andrew Carlson", team: 3, amount: 25 }, { bettor: "Andrew Carlson", team: 4, amount: 50 },
        { bettor: "Andrew Carlson", team: 6, amount: 40 }, { bettor: "Andrew Carlson", team: 8, amount: 50 },
        { bettor: "Anthony Laud", team: 1, amount: 100 }, { bettor: "Anthony Laud", team: 5, amount: 100 },
        { bettor: "Anthony Laud", team: 7, amount: 25 }, { bettor: "Anthony Laud", team: 8, amount: 75 },
        { bettor: "Brendan Black", team: 1, amount: 50 }, { bettor: "Brendan Black", team: 4, amount: 25 },
        { bettor: "Brendan Black", team: 8, amount: 25 },
        { bettor: "Reid Hartley", team: 1, amount: 50 }, { bettor: "Reid Hartley", team: 4, amount: 25 },
        { bettor: "Reid Hartley", team: 8, amount: 25 },
        { bettor: "Chris Statchuk", team: 2, amount: 10 }, { bettor: "Chris Statchuk", team: 3, amount: 10 },
        { bettor: "Chris Statchuk", team: 4, amount: 50 }, { bettor: "Chris Statchuk", team: 5, amount: 40 },
        { bettor: "Chris Statchuk", team: 7, amount: 25 }, { bettor: "Chris Statchuk", team: 8, amount: 40 },
        { bettor: "Dave MacDougall", team: 1, amount: 20 }, { bettor: "Dave MacDougall", team: 2, amount: 20 },
        { bettor: "Dave MacDougall", team: 4, amount: 40 }, { bettor: "Dave MacDougall", team: 5, amount: 20 },
        { bettor: "Dave MacDougall", team: 8, amount: 100 },
        { bettor: "David Carlson", team: 4, amount: 200 },
        { bettor: "Dusse", team: 4, amount: 40 }, { bettor: "Dusse", team: 7, amount: 20 }, { bettor: "Dusse", team: 8, amount: 40 },
        { bettor: "Geoff Crain", team: 5, amount: 100 },
        { bettor: "Keon Karamchi", team: 2, amount: 100 }, { bettor: "Keon Karamchi", team: 3, amount: 50 },
        { bettor: "Keon Karamchi", team: 3, amount: 50 }, { bettor: "Keon Karamchi", team: 4, amount: 100 },
        { bettor: "Keon Karamchi", team: 7, amount: 150 },
        { bettor: "Kevin Kernohan", team: 3, amount: 75 }, { bettor: "Kevin Kernohan", team: 7, amount: 150 },
        { bettor: "Mark Johnson", team: 1, amount: 50 }, { bettor: "Mark Johnson", team: 2, amount: 50 },
        { bettor: "Mark Johnson", team: 3, amount: 50 }, { bettor: "Mark Johnson", team: 4, amount: 50 },
        { bettor: "Nick Crain", team: 2, amount: 40 },
        { bettor: "Nolan Rundle", team: 1, amount: 50 }, { bettor: "Nolan Rundle", team: 2, amount: 30 },
        { bettor: "Nolan Rundle", team: 4, amount: 50 }, { bettor: "Nolan Rundle", team: 5, amount: 30 },
        { bettor: "Nolan Rundle", team: 6, amount: 40 }, { bettor: "Nolan Rundle", team: 8, amount: 50 },
        { bettor: "Paul Statchuk", team: 1, amount: 25 }, { bettor: "Paul Statchuk", team: 4, amount: 100 },
        { bettor: "Paul Statchuk", team: 7, amount: 100 }, { bettor: "Paul Statchuk", team: 8, amount: 300 },
        { bettor: "Roscoe", team: 3, amount: 20 },
      ],
      results: [
        { bettor: "Brendan Black", wagered: 100, onWinner: 50, payout: 493, net: 393 },
        { bettor: "Reid Hartley", wagered: 100, onWinner: 50, payout: 493, net: 393 },
        { bettor: "Anthony Laud", wagered: 300, onWinner: 100, payout: 986, net: 686 },
        { bettor: "Mark Johnson", wagered: 200, onWinner: 50, payout: 493, net: 293 },
        { bettor: "Nolan Rundle", wagered: 250, onWinner: 50, payout: 493, net: 243 },
        { bettor: "Dave MacDougall", wagered: 200, onWinner: 20, payout: 197, net: -3 },
        { bettor: "Roscoe", wagered: 20, onWinner: 0, payout: 0, net: -20 },
        { bettor: "Nick Crain", wagered: 40, onWinner: 0, payout: 0, net: -40 },
        { bettor: "Dusse", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Geoff Crain", wagered: 100, onWinner: 0, payout: 0, net: -100 },
        { bettor: "Andrew Carlson", wagered: 165, onWinner: 0, payout: 0, net: -165 },
        { bettor: "Chris Statchuk", wagered: 175, onWinner: 0, payout: 0, net: -175 },
        { bettor: "David Carlson", wagered: 200, onWinner: 0, payout: 0, net: -200 },
        { bettor: "Kevin Kernohan", wagered: 225, onWinner: 0, payout: 0, net: -225 },
        { bettor: "Adam Hoffman", wagered: 350, onWinner: 10, payout: 99, net: -251 },
        { bettor: "Paul Statchuk", wagered: 525, onWinner: 25, payout: 246, net: -279 },
        { bettor: "Keon Karamchi", wagered: 450, onWinner: 0, payout: 0, net: -450 },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════

const colors = {
  green: "#15803d",
  greenLight: "#22c55e",
  greenDark: "#14532d",
  gold: "#d97706",
  goldLight: "#fbbf24",
  bg: "#fafaf9",
  card: "#ffffff",
  text: "#1c1917",
  textMuted: "#78716c",
  border: "#e7e5e4",
  accent: "#15803d",
};

const CHART_COLORS = ["#15803d", "#d97706", "#2563eb", "#dc2626", "#7c3aed", "#0891b2", "#ea580c", "#4f46e5"];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function formatScore(toPar) {
  if (toPar === 0) return "E";
  return toPar > 0 ? `+${toPar}` : `${toPar}`;
}

function formatMoney(n) {
  if (n === 0) return "$0";
  const prefix = n > 0 ? "+$" : "-$";
  return `${prefix}${Math.abs(n).toLocaleString()}`;
}

function ChampionIcon({ count, size = 16 }) {
  if (!count || count === 0) return null;
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: "4px" }}>
      <Trophy size={size} color={colors.gold} fill={colors.gold} />
      {count > 1 && (
        <span style={{
          position: "absolute", top: "-4px", right: "-6px",
          background: colors.greenDark, color: "white",
          fontSize: Math.max(8, size - 6) + "px", fontWeight: 800,
          width: Math.max(12, size - 2) + "px", height: Math.max(12, size - 2) + "px",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          border: "1.5px solid white",
        }}>
          {count}
        </span>
      )}
    </span>
  );
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: { background: "#f5f5f4", color: colors.text },
    gold: { background: "#fef3c7", color: "#92400e" },
    green: { background: "#dcfce7", color: "#14532d" },
    red: { background: "#fee2e2", color: "#991b1b" },
  };
  const s = styles[variant] || styles.default;
  return (
    <span style={{ ...s, padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600, display: "inline-block" }}>
      {children}
    </span>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.card,
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        padding: "24px",
        cursor: onClick ? "pointer" : "default",
        transition: "box-shadow 0.2s, transform 0.15s",
        ...(onClick ? { ":hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" } } : {}),
        ...style,
      }}
      onMouseEnter={onClick ? (e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; } : undefined}
      onMouseLeave={onClick ? (e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; } : undefined}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      {Icon && <Icon size={22} color={colors.green} />}
      <h2 style={{ fontSize: "22px", fontWeight: 600, color: colors.text, margin: 0, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{children}</h2>
    </div>
  );
}

function Table({ columns, data, onRowClick, defaultSort, sortable, rowStyle }) {
  const [sortCol, setSortCol] = useState(defaultSort?.col ?? null);
  const [sortDir, setSortDir] = useState(defaultSort?.dir ?? "desc");

  const handleSort = (colIndex) => {
    if (!sortable) return;
    const col = columns[colIndex];
    if (!col.sortKey && !col.key && !col.sortValue) return;
    if (sortCol === colIndex) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(colIndex);
      setSortDir("desc");
    }
  };

  const sortedData = useMemo(() => {
    if (sortCol == null || !sortable) return data;
    const col = columns[sortCol];
    const getValue = (row) => {
      if (col.sortValue) return col.sortValue(row);
      if (col.key) return row[col.key];
      return null;
    };
    return [...data].sort((a, b) => {
      let va = getValue(a), vb = getValue(b);
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "string") { va = va.toLowerCase(); vb = (vb || "").toLowerCase(); }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortCol, sortDir, sortable, columns]);

  return (
    <div style={{ overflowX: "auto", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ background: colors.greenDark }}>
            {columns.map((col, i) => {
              const isSortable = sortable && (col.sortKey || col.key || col.sortValue);
              const isActive = sortCol === i;
              return (
                <th key={i} onClick={() => isSortable && handleSort(i)} style={{ padding: "10px 14px", textAlign: col.align || "left", color: "white", fontWeight: 600, whiteSpace: "nowrap", fontSize: "13px", cursor: isSortable ? "pointer" : "default", userSelect: "none" }}>
                  {col.header}{isActive ? (sortDir === "asc" ? " ▲" : " ▼") : isSortable ? " ⇅" : ""}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, ri) => {
            const extraStyle = rowStyle ? rowStyle(row) : {};
            const baseBg = extraStyle.background || (ri % 2 === 0 ? "#ffffff" : "#fafaf9");
            return (
            <tr
              key={ri}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{
                background: baseBg,
                cursor: onRowClick ? "pointer" : "default",
                transition: "background 0.15s",
                ...extraStyle,
              }}
              onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.background = "#ecfdf5"; }}
              onMouseLeave={(e) => { if (onRowClick) e.currentTarget.style.background = baseBg; }}
            >
              {columns.map((col, ci) => (
                <td key={ci} style={{ padding: "10px 14px", textAlign: col.align || "left", whiteSpace: "nowrap", fontWeight: col.bold ? 600 : 400, color: col.color ? col.color(row) : colors.text }}>
                  {col.render ? col.render(row, ri) : row[col.key]}
                </td>
              ))}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Nav({ active, setPage }) {
  const mobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const isRulesActive = active === "rules" || active === "course-legend" || active === "course-legacy";

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "tournaments", label: "Tournaments", icon: Trophy },
    { id: "players", label: "Players", icon: Users },
    { id: "parimutuel", label: "Parimutuel", icon: DollarSign },
  ];

  const rulesItems = [
    { id: "rules", label: "Competition Rules", icon: Flag },
    { id: "course-legend", label: "Legend Course Guide", icon: MapPin },
    { id: "course-legacy", label: "Legacy Course Guide", icon: MapPin },
  ];

  const handleNav = (id) => { setPage({ id }); setMenuOpen(false); setRulesOpen(false); };

  // Mobile: hamburger menu
  if (mobile) {
    return (
      <>
        <nav style={{ background: colors.greenDark, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", position: "relative", zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => handleNav("home")}>
            <img src={process.env.PUBLIC_URL + "/logo-small-white.png"} alt="SGP Classic" style={{ height: "28px", objectFit: "contain" }} />
            <span style={{ color: "white", fontSize: "16px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>SGP CLASSIC</span>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "1px", transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "1px", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "white", borderRadius: "1px", transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </nav>
        {menuOpen && (
          <>
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: "rgba(0,0,0,0.3)" }} onClick={() => { setMenuOpen(false); setRulesOpen(false); }} />
            <div style={{ position: "fixed", top: "56px", left: 0, right: 0, zIndex: 100, background: colors.greenDark, borderBottom: "2px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <div key={item.id} onClick={() => handleNav(item.id)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 20px", cursor: "pointer", background: isActive ? "rgba(255,255,255,0.1)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <Icon size={18} color="white" />
                    <span style={{ color: "white", fontSize: "15px", fontWeight: isActive ? 700 : 400 }}>{item.label}</span>
                  </div>
                );
              })}
              {/* Rules section */}
              <div onClick={() => setRulesOpen(!rulesOpen)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", cursor: "pointer", background: isRulesActive ? "rgba(255,255,255,0.1)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Flag size={18} color="white" />
                  <span style={{ color: "white", fontSize: "15px", fontWeight: isRulesActive ? 700 : 400 }}>Rules</span>
                </div>
                <span style={{ color: "white", fontSize: "10px", transform: rulesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>&#9660;</span>
              </div>
              {rulesOpen && rulesItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} onClick={() => handleNav(item.id)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px 12px 48px", cursor: "pointer", background: active === item.id ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <Icon size={16} color={colors.goldLight} />
                    <span style={{ color: "white", fontSize: "14px", fontWeight: active === item.id ? 600 : 400 }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop: horizontal nav with Rules dropdown
  return (
    <nav style={{ background: colors.greenDark, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", position: "relative", zIndex: 100, overflow: "visible" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => handleNav("home")}>
        <img src={process.env.PUBLIC_URL + "/logo-small-white.png"} alt="SGP Classic" style={{ height: "36px", objectFit: "contain" }} />
        <span style={{ color: "white", fontSize: "20px", fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>SGP CLASSIC</span>
      </div>
      <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => handleNav(item.id)} style={{ background: isActive ? "rgba(255,255,255,0.15)" : "transparent", border: "none", color: "white", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: isActive ? 600 : 400, transition: "background 0.15s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={16} />{item.label}
            </button>
          );
        })}
        {/* Rules dropdown */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setRulesOpen(!rulesOpen)} style={{ background: isRulesActive ? "rgba(255,255,255,0.15)" : "transparent", border: "none", color: "white", padding: "8px 18px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: isRulesActive ? 600 : 400, transition: "background 0.15s", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { if (!isRulesActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { if (!isRulesActive) e.currentTarget.style.background = "transparent"; }}
          >
            <Flag size={16} />Rules
            <span style={{ fontSize: "10px", marginLeft: "2px", transition: "transform 0.2s", display: "inline-block", transform: rulesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>&#9660;</span>
          </button>
        </div>
      </div>
      {rulesOpen && (
        <>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 150 }} onClick={() => setRulesOpen(false)} />
          <div style={{ position: "fixed", top: "56px", right: "32px", background: "white", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: "230px", zIndex: 200, border: `1px solid ${colors.border}` }}>
            {rulesItems.map((item, i, arr) => (
              <div key={item.id} onClick={() => handleNav(item.id)} style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", fontWeight: 500, color: colors.text, background: active === item.id ? "#ecfdf5" : "white", borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none", borderRadius: i === 0 ? "8px 8px 0 0" : i === arr.length - 1 ? "0 0 8px 8px" : "0" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f0fdf4"}
                onMouseLeave={(e) => e.currentTarget.style.background = active === item.id ? "#ecfdf5" : "white"}
              >
                <item.icon size={16} color={colors.green} />{item.label}
              </div>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}

function Breadcrumb({ items, onNavigate }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px", fontSize: "14px", color: colors.textMuted }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {i > 0 && <ChevronRight size={14} />}
          {item.onClick ? (
            <span onClick={item.onClick} style={{ cursor: "pointer", color: colors.green, fontWeight: 500 }}>{item.label}</span>
          ) : (
            <span style={{ fontWeight: 600, color: colors.text }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage({ setPage }) {
  const mobile = useIsMobile();
  return (
    <div>
      {/* Hero — Upcoming Tournament */}
      <div style={{ background: `linear-gradient(135deg, ${colors.greenDark} 0%, #166534 100%)`, borderRadius: mobile ? "12px" : "16px", padding: mobile ? "28px 20px" : "48px 40px", marginBottom: "32px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-20px", opacity: 0.08, fontSize: "200px", fontWeight: 900 }}>9</div>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: mobile ? "12px" : "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.8, marginBottom: "8px", fontFamily: "'Oswald', sans-serif" }}>Year 9</div>
          <img src={process.env.PUBLIC_URL + "/logo-white.png"} alt="SGP Classic" style={{ height: mobile ? "50px" : "80px", objectFit: "contain", marginBottom: "8px" }} />
          <h1 style={{ fontSize: mobile ? "28px" : "42px", fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "1px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>SGP Classic 2026</h1>
          <p style={{ fontSize: mobile ? "15px" : "18px", opacity: 0.85, margin: "0 0 28px 0" }}>Woodington Lake Golf Club &middot; Tottenham, ON</p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, auto)", gap: mobile ? "10px" : "16px" }}>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 20px" }}>
              <Calendar size={18} style={{ marginBottom: "6px", opacity: 0.8 }} />
              <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>Date</div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>July 11, 2026</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 20px" }}>
              <Flag size={18} style={{ marginBottom: "6px", opacity: 0.8 }} />
              <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>Round 1 — Morning</div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>2-Man Net Best Ball</div>
              <div style={{ fontSize: "14px", color: colors.goldLight, fontWeight: 600 }}>Legacy Course &middot; Shotgun 9:00 AM</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "10px", padding: "14px 20px" }}>
              <Flag size={18} style={{ marginBottom: "6px", opacity: 0.8 }} />
              <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "4px" }}>Round 2 — Afternoon</div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>2-Man Scramble</div>
              <div style={{ fontSize: "14px", color: colors.goldLight, fontWeight: 600 }}>Legend Course &middot; Tee Times Every 10 Min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Timeline */}
      <SectionTitle icon={Calendar}>Upcoming Dates</SectionTitle>
      <div style={{ display: "grid", gap: "0", marginBottom: "32px", borderRadius: "12px", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
        {[
          { date: "May 20", detail: "9:00 PM", label: "Live Draft", desc: "Random draw to select teams", icon: Users, past: new Date("2026-05-20T21:00:00") < new Date() },
          { date: "Jun 11", detail: "", label: "Parimutuel Opens", desc: "Betting window opens for all participants", icon: DollarSign, past: new Date("2026-06-11") < new Date() },
          { date: "Jun 28", detail: "", label: "Handicaps Lock", desc: "Final handicap index recorded for tournament play", icon: Flag, past: new Date("2026-06-28") < new Date() },
          { date: "Jul 11", detail: "", label: "Tournament Day", desc: "SGP Classic Year 9 at Woodington Lake Golf Club", icon: Trophy, past: new Date("2026-07-11") < new Date() },
        ].map((evt, i, arr) => {
          const Icon = evt.icon;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", background: evt.past ? "#f0fdf4" : "white", borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none" }}>
              <div style={{ width: "72px", flexShrink: 0, textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Oswald', sans-serif", color: evt.past ? colors.green : colors.greenDark }}>{evt.date}</div>
                {evt.detail && <div style={{ fontSize: "12px", color: colors.textMuted }}>{evt.detail}</div>}
              </div>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: evt.past ? colors.green : colors.greenDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {evt.past ? <span style={{ color: "white", fontSize: "16px", fontWeight: 700 }}>&#10003;</span> : <Icon size={16} color="white" />}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{evt.label}</div>
                <div style={{ fontSize: "13px", color: colors.textMuted }}>{evt.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Field */}
      <SectionTitle icon={Users}>The Field — 20 Players</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "8px", marginBottom: "32px" }}>
        {["Reid Hartley", "Brendan Black", "Chris Williams", "Keon Karamchi", "Chris Statchuk", "Paul Statchuk", "Anthony Laud", "Andrew Carlson", "David Carlson", "Dave MacDougall", "Nolan Rundle", "Kevin Kernohan", "Geoff Crain", "Mark Johnson", "Nick Crain", "Patrick Forbes", "Joel Greaves", "Graham Booth", "Johnny D'Amato", "Trevor Williams"].map((name, i) => (
          <div key={i} style={{ background: "#f5f5f4", borderRadius: "10px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
            <User size={16} color={colors.green} />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Entry Fee Details */}
      <SectionTitle icon={DollarSign}>Entry Fee Details</SectionTitle>
      <Card style={{ marginBottom: "32px", padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: colors.greenDark }}>
              <th style={{ padding: "10px 20px", textAlign: "left", color: "white", fontWeight: 600, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Item</th>
              <th style={{ padding: "10px 20px", textAlign: "right", color: "white", fontWeight: 600, fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {[
              { item: "Round 1", cost: "$120.00" },
              { item: "Round 2", cost: "$115.00" },
              { item: "HST", cost: "$30.55" },
              { item: "Golfify Fee", cost: "$5.00" },
              { item: "After Party", cost: "$30.00" },
              { item: "Prize Pool", cost: "$60.00" },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#ffffff" : "#fafaf9", borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: "10px 20px" }}>{row.item}</td>
                <td style={{ padding: "10px 20px", textAlign: "right" }}>{row.cost}</td>
              </tr>
            ))}
            <tr style={{ background: colors.greenDark }}>
              <td style={{ padding: "12px 20px", fontWeight: 700, fontSize: "15px", color: "white", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total</td>
              <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: 700, fontSize: "18px", color: colors.goldLight, fontFamily: "'Oswald', sans-serif" }}>$360.55</td>
            </tr>
          </tbody>
        </table>
      </Card>

      {/* Draft & Teams */}
      <div style={{ padding: "24px", background: "#f5f5f4", borderRadius: "12px", textAlign: "center", color: colors.textMuted }}>
        <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: 600, color: colors.text }}>Live Draft — May 20th at 9:00 PM</p>
        <p style={{ margin: 0, fontSize: "14px" }}>Teams will be selected via random draw. Link to join the live draft will be posted here.</p>
      </div>
    </div>
  );
}

function TournamentsPage({ setPage }) {
  const years = Object.keys(TOURNAMENTS).sort((a, b) => b - a);
  return (
    <div>
      <SectionTitle icon={Trophy}>Tournament History</SectionTitle>
      <p style={{ color: colors.textMuted, marginBottom: "24px", fontSize: "15px" }}>Click on a year to see the full results, leaderboard, and course details.</p>
      <div style={{ display: "grid", gap: "16px" }}>
        {years.map((yr) => {
          const t = TOURNAMENTS[yr];
          const winner = t.leaderboard[0];
          return (
            <Card key={yr} onClick={() => setPage({ id: "tournament-detail", year: parseInt(yr) })} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ background: colors.greenDark, color: colors.goldLight, width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 800 }}>
                  {t.yearNum}
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700 }}>{t.year}</div>
                  <div style={{ fontSize: "13px", color: colors.textMuted }}>{t.venue} &middot; {t.location}</div>
                </div>
              </div>
              <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "24px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: colors.textMuted }}>Champions</div>
                  <div style={{ fontSize: "15px", fontWeight: 700 }}>{winner.team}</div>
                  <Badge variant="green">{formatScore(winner.toPar)}</Badge>
                </div>
                <ChevronRight size={20} color={colors.textMuted} />
              </div>
            </Card>
          );
        })}
      </div>
      {/* Placeholder for future years */}
      <div style={{ marginTop: "24px", padding: "20px", background: "#f5f5f4", borderRadius: "12px", textAlign: "center", color: colors.textMuted }}>
        <p style={{ margin: 0, fontSize: "14px" }}>Years 1–7 coming soon — historical data will be added as it's collected.</p>
      </div>
    </div>
  );
}

function TournamentDetailPage({ year, defaultTab, setPage }) {
  const t = TOURNAMENTS[year];
  if (!t) return <div>Tournament not found.</div>;
  const mobile = useIsMobile();

  const [tab, setTab] = useState(defaultTab || "leaderboard");

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Tournaments", onClick: () => setPage({ id: "tournaments" }) },
          { label: `${t.year} — Year ${t.yearNum}` },
        ]}
        onNavigate={setPage}
      />

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${colors.greenDark} 0%, #166534 100%)`, borderRadius: "12px", padding: mobile ? "20px 16px" : "28px 32px", marginBottom: "24px", color: "white" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.7, fontFamily: "'Oswald', sans-serif" }}>Year {t.yearNum}</div>
        <h1 style={{ fontSize: mobile ? "24px" : "32px", fontWeight: 700, margin: "4px 0 6px 0", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>SGP Classic {t.year}</h1>
        <p style={{ margin: 0, opacity: 0.8, fontSize: mobile ? "14px" : "16px" }}>{t.venue} &middot; {t.location}</p>
      </div>

      {/* Awards Row */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        <Card style={{ textAlign: "center", borderTop: `3px solid ${colors.gold}` }}>
          <Trophy size={24} color={colors.gold} style={{ marginBottom: "8px" }} />
          <div style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>Champions</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{t.leaderboard[0].team}</div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: colors.green }}>{formatScore(t.leaderboard[0].toPar)} NET &middot; ${t.prizeSplit.first}</div>
        </Card>
        <Card style={{ textAlign: "center", borderTop: `3px solid #a3a3a3` }}>
          <Award size={24} color="#a3a3a3" style={{ marginBottom: "8px" }} />
          <div style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>Runner-Up</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{t.leaderboard[1].team}</div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: colors.green }}>{formatScore(t.leaderboard[1].toPar)} NET &middot; ${t.prizeSplit.second}</div>
        </Card>
        <Card style={{ textAlign: "center", borderTop: `3px solid ${colors.greenLight}` }}>
          <Flag size={24} color={colors.greenLight} style={{ marginBottom: "8px" }} />
          <div style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>Low Gross (R1)</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{t.lowGross.player}</div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: colors.green }}>{t.lowGross.score} (+{t.lowGross.toPar}) &middot; {t.lowGross.course}</div>
        </Card>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "20px", borderBottom: `2px solid ${colors.border}`, paddingBottom: "0", overflowX: "auto" }}>
        {[
          { id: "leaderboard", label: "Leaderboard" },
          { id: "individual", label: mobile ? "Scores" : "Individual Scores" },
          { id: "teams", label: "Teams" },
          { id: "course", label: mobile ? "Course" : "Course Info" },
          { id: "pari", label: "Parimutuel" },
        ].map((t2) => (
          <button
            key={t2.id}
            onClick={() => setTab(t2.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: tab === t2.id ? `3px solid ${colors.green}` : "3px solid transparent",
              padding: mobile ? "8px 10px" : "10px 18px",
              fontSize: mobile ? "12px" : "14px",
              fontWeight: tab === t2.id ? 700 : 400,
              whiteSpace: "nowrap",
              color: tab === t2.id ? colors.green : colors.textMuted,
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            {t2.label}
          </button>
        ))}
      </div>

      {tab === "leaderboard" && (() => {
        const hasDetailedScores = t.leaderboard[0]?.r1Gross != null;
        const cols = [
          { header: "Pos", key: "pos", align: "center" },
          { header: "Team", bold: true, render: (r) => <span>{r.team}{r.note ? <span style={{ fontSize: "11px", color: colors.textMuted, marginLeft: "6px" }}>({r.note})</span> : ""}</span> },
        ];
        if (hasDetailedScores) {
          cols.push(
            { header: "R1 Gross", key: "r1Gross", align: "center" },
            { header: "R1 Net", key: "r1Net", align: "center" },
            { header: "R2 Gross", key: "r2Gross", align: "center" },
            { header: "R2 Net", key: "r2Net", align: "center" },
            { header: "Total Gross", key: "totalGross", align: "center" },
            { header: "Total Net", key: "totalNet", align: "center", bold: true },
          );
        }
        if (t.leaderboard[0]?.toPar != null) {
          cols.push({ header: "To Par", align: "center", render: (r) => formatScore(r.toPar), bold: true, color: (r) => r.toPar < 0 ? "#dc2626" : colors.text });
        }
        cols.push({ header: "Prize", align: "right", render: (r) => r.prize > 0 ? `$${r.prize}` : "—" });
        return <Table columns={cols} data={t.leaderboard} />;
      })()}

      {tab === "individual" && (
        <div>
          {t.individualScores.length > 0 ? (
            <>
              <div style={{ marginBottom: "12px", fontSize: "14px", color: colors.textMuted }}>
                Round 1 &middot; {t.round1Format} &middot; {t.round1Course} Course &middot; Individual Scores
              </div>
              <Table
                sortable
                defaultSort={{ col: 5, dir: "asc" }}
                columns={[
                  { header: "#", align: "center", render: (_, i) => i + 1 },
                  { header: "Player", bold: true, render: (r) => r.name === t.lowGross.player ? <span>{r.name} <span style={{ color: colors.gold }}>&#9733;</span></span> : r.name, sortValue: (r) => r.name },
                  { header: "Hdcp", key: "hdcp", align: "center" },
                  { header: "Front", key: "front", align: "center" },
                  { header: "Back", key: "back", align: "center" },
                  { header: "Gross", key: "gross", align: "center", bold: true },
                  { header: "Net", key: "net", align: "center" },
                  { header: "To Par", align: "center", render: (r) => formatScore(r.toPar), bold: true, color: (r) => r.toPar <= 0 ? "#dc2626" : colors.text, sortValue: (r) => r.toPar },
                ]}
                data={t.individualScores}
                onRowClick={(r) => setPage({ id: "player-detail", name: r.name })}
              />
            </>
          ) : (
            <div style={{ padding: "40px", textAlign: "center", color: colors.textMuted, background: "#f5f5f4", borderRadius: "12px" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600 }}>Detailed individual scores not available for this year</p>
              <p style={{ margin: 0, fontSize: "14px" }}>Low Gross: {t.lowGross.player} — {t.lowGross.score} (+{t.lowGross.toPar})</p>
            </div>
          )}
        </div>
      )}

      {tab === "teams" && (
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: "12px" }}>
          {t.teams.map((team) => {
            const result = t.leaderboard.find((l) => l.teamNum === team.num);
            return (
              <Card key={team.num} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ background: colors.greenDark, color: "white", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", flexShrink: 0 }}>
                  {team.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "15px" }}>{team.p1} & {team.p2}</div>
                  {result && <div style={{ fontSize: "13px", color: colors.textMuted }}>Finished {result.pos}{typeof result.pos === "number" ? ["st", "nd", "rd"][result.pos - 1] || "th" : ""} &middot; {formatScore(result.toPar)} NET</div>}
                </div>
                {result && result.pos === 1 && <Trophy size={20} color={colors.gold} />}
              </Card>
            );
          })}
        </div>
      )}

      {tab === "course" && (() => {
        const isSingleCourse = t.round1Course === t.round2Course;
        const courseKeys = isSingleCourse ? [t.round1Course.toLowerCase()] : ["legacy", "legend"];
        return (
        <div style={{ display: "grid", gridTemplateColumns: isSingleCourse ? "1fr" : "1fr 1fr", gap: "24px" }}>
          {courseKeys.map((cKey) => {
            const c = COURSES[cKey];
            const frontHoles = c.holes.filter((h) => h.num <= 9);
            const backHoles = c.holes.filter((h) => h.num > 9);
            const frontPar = frontHoles.reduce((s, h) => s + h.par, 0);
            const backPar = backHoles.reduce((s, h) => s + h.par, 0);
            const frontYards = frontHoles.reduce((s, h) => s + h.yards, 0);
            const backYards = backHoles.reduce((s, h) => s + h.yards, 0);
            const roundInfo = isSingleCourse ? `R1: ${t.round1Format} / R2: ${t.round2Format}` : (cKey === "legacy" ? `R1: ${t.round1Format}` : `R2: ${t.round2Format}`);
            return (
              <Card key={cKey}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px 0", fontSize: "18px" }}>{c.name}</h3>
                    <div style={{ fontSize: "13px", color: colors.textMuted }}>{c.tees} &middot; {c.totalYards} yards &middot; {roundInfo}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "12px", color: colors.textMuted }}>
                    <div>Rating: {c.rating}</div>
                    <div>Slope: {c.slope}</div>
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: colors.greenDark, color: "white" }}>
                        <th style={{ padding: "6px 8px" }}>Hole</th>
                        {frontHoles.map((h) => <th key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.num}</th>)}
                        <th style={{ padding: "6px 8px", background: "#0f4a24" }}>OUT</th>
                        {backHoles.map((h) => <th key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.num}</th>)}
                        <th style={{ padding: "6px 8px", background: "#0f4a24" }}>IN</th>
                        <th style={{ padding: "6px 8px", background: "#0f4a24" }}>TOT</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: "#fefce8" }}>
                        <td style={{ padding: "6px 8px", fontWeight: 600 }}>Yards</td>
                        {frontHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.yards}</td>)}
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{frontYards}</td>
                        {backHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.yards}</td>)}
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{backYards}</td>
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{c.totalYards}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "6px 8px", fontWeight: 600 }}>Par</td>
                        {frontHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.par}</td>)}
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{frontPar}</td>
                        {backHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.par}</td>)}
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{backPar}</td>
                        <td style={{ padding: "6px 8px", fontWeight: 700, textAlign: "center" }}>{c.par}</td>
                      </tr>
                      <tr style={{ background: "#f5f5f4" }}>
                        <td style={{ padding: "6px 8px", fontWeight: 600 }}>Hdcp</td>
                        {frontHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.hdcp}</td>)}
                        <td style={{ padding: "6px 8px" }}></td>
                        {backHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center" }}>{h.hdcp}</td>)}
                        <td style={{ padding: "6px 8px" }}></td>
                        <td style={{ padding: "6px 8px" }}></td>
                      </tr>
                      <tr>
                        <td style={{ padding: "6px 8px", fontWeight: 600 }}>Tee</td>
                        {frontHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center", fontSize: "10px", color: h.tee === "Blue" ? "#2563eb" : "#16a34a" }}>{h.tee[0]}</td>)}
                        <td style={{ padding: "6px 8px" }}></td>
                        {backHoles.map((h) => <td key={h.num} style={{ padding: "6px 4px", textAlign: "center", fontSize: "10px", color: h.tee === "Blue" ? "#2563eb" : "#16a34a" }}>{h.tee[0]}</td>)}
                        <td style={{ padding: "6px 8px" }}></td>
                        <td style={{ padding: "6px 8px" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            );
          })}
        </div>
        );
      })()}

      {tab === "pari" && (t.parimutuel ? <ParimutuelYearView t={t} /> : (
        <div style={{ padding: "40px", textAlign: "center", color: colors.textMuted, background: "#f5f5f4", borderRadius: "12px" }}>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>No parimutuel betting this year</p>
        </div>
      ))}
    </div>
  );
}

function ParimutuelYearView({ t }) {
  const mobile = useIsMobile();
  const teamPoolData = useMemo(() => {
    const pools = {};
    t.parimutuel.bets.forEach((b) => { pools[b.team] = (pools[b.team] || 0) + b.amount; });
    return t.teams.map((team) => ({
      name: `T${team.num}`,
      fullName: `${team.p1} & ${team.p2}`,
      amount: pools[team.num] || 0,
      isWinner: team.num === t.parimutuel.winningTeam,
    }));
  }, [t]);

  const bettorData = useMemo(() => {
    return t.parimutuel.results.map((r) => ({
      name: r.bettor.split(" ").pop(),
      fullName: r.bettor,
      net: r.net,
    }));
  }, [t]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Total Pool</div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: colors.green }}>${t.parimutuel.totalPool.toLocaleString()}</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Winning Team</div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: colors.gold }}>#{t.parimutuel.winningTeam}</div>
          <div style={{ fontSize: "13px", color: colors.textMuted }}>{t.teams.find((tm) => tm.num === t.parimutuel.winningTeam)?.p1} & {t.teams.find((tm) => tm.num === t.parimutuel.winningTeam)?.p2}</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Payout Multiplier</div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: colors.green }}>{t.parimutuel.payoutMultiplier}x</div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <Card>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Amount Wagered by Team</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={teamPoolData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v, n, p) => [`$${v}`, p.payload.fullName]} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {teamPoolData.map((entry, i) => (
                  <Cell key={i} fill={entry.isWinner ? colors.gold : colors.green} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Net Profit/Loss by Bettor</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bettorData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
              <Tooltip formatter={(v, n, p) => [formatMoney(v), p.payload.fullName]} />
              <Bar dataKey="net" radius={[0, 4, 4, 0]}>
                {bettorData.map((entry, i) => (
                  <Cell key={i} fill={entry.net >= 0 ? colors.green : "#dc2626"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <SectionTitle icon={DollarSign}>Full Betting Results</SectionTitle>
      <Table
        sortable
        columns={[
          { header: "Bettor", bold: true, render: (r) => r.bettor, sortValue: (r) => r.bettor },
          { header: "Total Wagered", align: "right", render: (r) => `$${r.wagered}`, sortValue: (r) => r.wagered },
          { header: "On Winner", align: "right", render: (r) => r.onWinner > 0 ? `$${r.onWinner}` : "—", sortValue: (r) => r.onWinner || 0 },
          { header: "Payout", align: "right", render: (r) => r.payout > 0 ? `$${r.payout}` : "—", sortValue: (r) => r.payout || 0 },
          { header: "Net P/L", align: "right", render: (r) => formatMoney(r.net), bold: true, color: (r) => r.net >= 0 ? "#16a34a" : "#dc2626", sortValue: (r) => r.net },
        ]}
        data={t.parimutuel.results}
      />
    </div>
  );
}

function PlayersPage({ setPage }) {
  const allPlayers = useMemo(() => {
    const players = {};
    // First pass: register all players from team rosters and calculate earnings
    Object.values(TOURNAMENTS).forEach((t) => {
      t.teams.forEach((team) => {
        [team.p1, team.p2].forEach((pName) => {
          if (!players[pName]) {
            players[pName] = { name: pName, years: 0, bestGross: Infinity, totalBirdies: 0, avgGross: 0, grossScores: [], appearances: [], championCount: 0, podiums: 0, lifetimeEarnings: 0, lifetimePariNet: 0 };
          }
          players[pName].years++;
          const isChampion = team.num === t.leaderboard[0].teamNum;
          if (isChampion) players[pName].championCount++;
          // Prize pool earnings (split between partners) and podium count
          const teamResult = t.leaderboard.find((l) => l.teamNum === team.num);
          if (teamResult) {
            const posNum = typeof teamResult.pos === "string" ? parseInt(teamResult.pos.replace(/\D/g, "")) : teamResult.pos;
            if (posNum >= 1 && posNum <= 3) players[pName].podiums++;
            if (teamResult.prize) players[pName].lifetimeEarnings += teamResult.prize / 2;
          }
          // Parimutuel net
          if (t.parimutuel) {
            const pariResult = t.parimutuel.results.find((r) => r.bettor === pName);
            if (pariResult) players[pName].lifetimePariNet += pariResult.net;
          }
        });
      });
    });
    // Second pass: add detailed scoring data where available
    Object.values(TOURNAMENTS).forEach((t) => {
      t.individualScores.forEach((s) => {
        if (!players[s.name]) return;
        const p = players[s.name];
        p.grossScores.push(s.gross);
        p.totalBirdies += s.birdies + (s.eagles || 0) * 2;
        p.bestGross = Math.min(p.bestGross, s.gross);
        p.avgGross = Math.round(p.grossScores.reduce((a, b) => a + b, 0) / p.grossScores.length);
        p.appearances.push({ year: t.year, ...s });
      });
    });
    // Clean up players with no scoring data
    Object.values(players).forEach((p) => {
      if (p.bestGross === Infinity) p.bestGross = null;
      if (p.grossScores.length === 0) p.avgGross = null;
    });
    return Object.values(players).sort((a, b) => b.years - a.years);
  }, []);

  return (
    <div>
      <SectionTitle icon={Users}>Player Roster</SectionTitle>
      <p style={{ color: colors.textMuted, marginBottom: "24px", fontSize: "15px" }}>Click on any player to see their full profile and career stats. Click column headers to sort.</p>
      <Table
        sortable
        defaultSort={{ col: 1, dir: "desc" }}
        columns={[
          { header: "Player", bold: true, render: (r) => <span>{r.name}<ChampionIcon count={r.championCount} /></span>, sortValue: (r) => r.name },
          { header: "Years", key: "years", align: "center" },
          { header: "Podiums", key: "podiums", align: "center", render: (r) => r.podiums > 0 ? r.podiums : "—", sortValue: (r) => r.podiums > 0 ? r.podiums : null },
          { header: "Avg Gross", align: "center", render: (r) => r.avgGross != null ? r.avgGross : "—", sortValue: (r) => r.avgGross },
          { header: "Best Gross", align: "center", render: (r) => r.bestGross != null ? r.bestGross : "—", sortValue: (r) => r.bestGross, color: () => colors.green },
          { header: "Prize $", align: "center", render: (r) => r.lifetimeEarnings > 0 ? `$${Math.round(r.lifetimeEarnings).toLocaleString()}` : "—", sortValue: (r) => r.lifetimeEarnings },
          { header: "Pari Net", align: "center", render: (r) => r.lifetimePariNet !== 0 ? `${r.lifetimePariNet >= 0 ? "+" : ""}$${Math.round(r.lifetimePariNet).toLocaleString()}` : "—", sortValue: (r) => r.lifetimePariNet !== 0 ? r.lifetimePariNet : null, color: (r) => r.lifetimePariNet > 0 ? "#16a34a" : r.lifetimePariNet < 0 ? "#dc2626" : colors.text },
        ]}
        data={allPlayers}
        onRowClick={(r) => setPage({ id: "player-detail", name: r.name })}
      />
    </div>
  );
}

function PlayerDetailPage({ name, setPage }) {
  const mobile = useIsMobile();
  const playerData = useMemo(() => {
    const appearances = [];
    let championCount = 0;
    let lowGrossWins = [];

    Object.values(TOURNAMENTS).sort((a, b) => b.year - a.year).forEach((t) => {
      const team = t.teams.find((tm) => tm.p1 === name || tm.p2 === name);
      if (!team) return;

      const teamResult = team ? t.leaderboard.find((l) => l.teamNum === team.num) : null;
      const partner = team.p1 === name ? team.p2 : team.p1;
      const isChamp = team.num === t.leaderboard[0].teamNum;
      if (isChamp) championCount++;
      if (t.lowGross.player === name) lowGrossWins.push(t.year);

      const score = t.individualScores.find((s) => s.name === name);
      const pariResult = t.parimutuel ? t.parimutuel.results.find((r) => r.bettor === name) : null;

      appearances.push({
        year: t.year,
        partner,
        teamNum: team.num,
        teamPos: teamResult?.pos,
        teamToPar: teamResult?.toPar,
        gross: score?.gross || null,
        toPar: score?.toPar || null,
        hdcp: score?.hdcp || null,
        name: name,
        isChampion: isChamp,
        prize: teamResult?.prize ? teamResult.prize / 2 : 0,
        pariNet: pariResult?.net || 0,
        pariWagered: pariResult?.wagered || 0,
        hasDetailedScore: !!score,
      });
    });

    const scoredAppearances = appearances.filter((a) => a.hasDetailedScore);
    const avgGross = scoredAppearances.length ? Math.round(scoredAppearances.reduce((s, a) => s + a.gross, 0) / scoredAppearances.length) : null;
    const bestGross = scoredAppearances.length ? Math.min(...scoredAppearances.map((a) => a.gross)) : null;
    const totalEarnings = appearances.reduce((s, a) => s + (a.prize || 0), 0);
    const podiums = appearances.filter((a) => { const p = typeof a.teamPos === "string" ? parseInt(a.teamPos.replace(/\D/g, "")) : a.teamPos; return p >= 1 && p <= 3; }).length;
    const careerPariNet = appearances.reduce((s, a) => s + a.pariNet, 0);

    return { name, appearances, championCount, lowGrossWins, avgGross, bestGross, totalEarnings, podiums, careerPariNet };
  }, [name]);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Players", onClick: () => setPage({ id: "players" }) },
          { label: playerData.name },
        ]}
      />

      <div style={{ display: "flex", gap: mobile ? "16px" : "24px", marginBottom: "28px", alignItems: "start" }}>
        <div style={{ background: colors.greenDark, color: "white", width: mobile ? "56px" : "80px", height: mobile ? "56px" : "80px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: mobile ? "20px" : "28px", fontWeight: 800, flexShrink: 0 }}>
          {playerData.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 6px 0", fontFamily: "'Oswald', sans-serif", letterSpacing: "0.5px" }}>
            {playerData.name}
            <ChampionIcon count={playerData.championCount} size={22} />
          </h1>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {playerData.championCount > 0 && <Badge variant="gold">{playerData.championCount}x Champion</Badge>}
            {playerData.lowGrossWins.length > 0 && <Badge variant="green">{playerData.lowGrossWins.length > 1 ? playerData.lowGrossWins.length + "x " : ""}Low Gross</Badge>}
            <Badge>{playerData.appearances.length} Tournament{playerData.appearances.length !== 1 ? "s" : ""}</Badge>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Avg Rd.1 Gross", value: playerData.avgGross != null ? playerData.avgGross : "—" },
          { label: "Podiums", value: playerData.podiums || "—" },
          { label: "Total Earnings", value: playerData.totalEarnings > 0 ? `$${playerData.totalEarnings.toLocaleString()}` : "—" },
          { label: "Career Pari P/L", value: playerData.careerPariNet !== 0 ? formatMoney(playerData.careerPariNet) : "—", color: playerData.careerPariNet >= 0 ? "#16a34a" : "#dc2626" },
        ].map((stat, i) => (
          <Card key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: stat.color || colors.greenDark }}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <SectionTitle icon={Calendar}>Year-by-Year Results</SectionTitle>
      <Table
        columns={[
          { header: "Year", key: "year", bold: true },
          { header: "Partner", key: "partner" },
          { header: "Finish", align: "center", render: (r) => r.teamPos ? `${r.teamPos}${typeof r.teamPos === "number" ? ["st","nd","rd"][r.teamPos-1] || "th" : ""}` : "—" },
          { header: "Team To Par", align: "center", render: (r) => r.teamToPar != null ? formatScore(r.teamToPar) : "—", color: (r) => r.teamToPar < 0 ? "#dc2626" : colors.text },
          { header: "Rd.1 Gross", align: "center", bold: true, render: (r) => r.gross != null ? r.gross : "—" },
          { header: "Earnings", align: "right", render: (r) => r.prize > 0 ? `$${r.prize.toLocaleString()}` : "—" },
          { header: "Pari P/L", align: "right", render: (r) => r.pariWagered > 0 ? formatMoney(r.pariNet) : "—", color: (r) => r.pariNet >= 0 ? "#16a34a" : "#dc2626" },
        ]}
        data={playerData.appearances}
        onRowClick={(r) => setPage({ id: "tournament-detail", year: r.year })}
        rowStyle={(r) => r.isChampion ? { background: "#fef9c3", borderLeft: `3px solid ${colors.gold}`, fontWeight: 600 } : {}}
      />
    </div>
  );
}

function ParimutuelPage({ setPage }) {
  const mobile = useIsMobile();
  const allTimeData = useMemo(() => {
    const bettors = {};
    Object.values(TOURNAMENTS).forEach((t) => {
      if (!t.parimutuel) return;
      t.parimutuel.results.forEach((r) => {
        if (!bettors[r.bettor]) bettors[r.bettor] = { name: r.bettor, totalWagered: 0, totalPayout: 0, totalNet: 0, years: 0 };
        bettors[r.bettor].totalWagered += r.wagered;
        bettors[r.bettor].totalPayout += r.payout;
        bettors[r.bettor].totalNet += r.net;
        bettors[r.bettor].years++;
      });
    });
    const result = Object.values(bettors);
    result.forEach((b) => { b.avgWagered = b.years > 0 ? b.totalWagered / b.years : 0; });
    return result.sort((a, b) => b.totalNet - a.totalNet);
  }, []);

  const chartData = allTimeData.map((b) => ({
    name: b.name.split(" ").pop(),
    fullName: b.name,
    net: b.net,
    wagered: b.totalWagered,
    totalNet: b.totalNet,
  }));

  const pariYears = Object.values(TOURNAMENTS).filter((t) => t.parimutuel).sort((a, b) => b.year - a.year);
  const largestPotYear = pariYears.reduce((max, t) => t.parimutuel.totalPool > max.parimutuel.totalPool ? t : max, pariYears[0]);
  const biggestWinner = allTimeData[0];
  const biggestLoser = allTimeData[allTimeData.length - 1];
  const mostWagered = [...allTimeData].sort((a, b) => b.totalWagered - a.totalWagered)[0];

  // Best single-year win and loss
  const allSingleYearResults = [];
  pariYears.forEach((t) => {
    t.parimutuel.results.forEach((r) => {
      allSingleYearResults.push({ ...r, year: t.year });
    });
  });
  const bestSingleYear = allSingleYearResults.sort((a, b) => b.net - a.net)[0];
  const worstSingleYear = allSingleYearResults.sort((a, b) => a.net - b.net)[0];

  return (
    <div>
      <SectionTitle icon={DollarSign}>All-Time Parimutuel</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Largest Pot</div>
          <div style={{ fontSize: "28px", fontWeight: 800, color: colors.green }}>${largestPotYear.parimutuel.totalPool.toLocaleString()}</div>
          <div style={{ fontSize: "13px", color: colors.textMuted }}>{largestPotYear.year}</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Most Wagered All-Time</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{mostWagered?.name}</div>
          <div style={{ fontSize: "14px", color: colors.greenDark, fontWeight: 600 }}>${mostWagered?.totalWagered.toLocaleString()}</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Biggest All-Time Winner</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{biggestWinner?.name}</div>
          <div style={{ fontSize: "14px", color: "#16a34a", fontWeight: 600 }}>{formatMoney(biggestWinner?.totalNet)}</div>
        </Card>
        <Card style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textMuted }}>Biggest All-Time Loser</div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>{biggestLoser?.name}</div>
          <div style={{ fontSize: "14px", color: "#dc2626", fontWeight: 600 }}>{formatMoney(biggestLoser?.totalNet)}</div>
        </Card>
      </div>

      <Card style={{ marginBottom: "24px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Net Profit/Loss by Bettor (All-Time)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v, n, p) => [formatMoney(v), p.payload.fullName]} />
            <Bar dataKey="totalNet" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.totalNet >= 0 ? colors.green : "#dc2626"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <SectionTitle icon={TrendingUp}>All-Time Standings</SectionTitle>
      <Table
        sortable
        defaultSort={{ col: 5, dir: "desc" }}
        columns={[
          { header: "#", align: "center", render: (_, i) => i + 1 },
          { header: "Bettor", bold: true, render: (r) => r.name, sortValue: (r) => r.name },
          { header: "Years", key: "years", align: "center" },
          { header: "Total Wagered", align: "right", render: (r) => `$${r.totalWagered.toLocaleString()}`, sortValue: (r) => r.totalWagered },
          { header: "Avg Wagered", align: "right", render: (r) => `$${Math.round(r.avgWagered).toLocaleString()}`, sortValue: (r) => r.avgWagered },
          { header: "Total Payout", align: "right", render: (r) => `$${r.totalPayout.toLocaleString()}`, sortValue: (r) => r.totalPayout },
          { header: "Net P/L", align: "right", render: (r) => formatMoney(r.totalNet), bold: true, color: (r) => r.totalNet >= 0 ? "#16a34a" : "#dc2626", sortValue: (r) => r.totalNet },
        ]}
        data={allTimeData}
      />

      {/* Year by year links */}
      <div style={{ marginTop: "32px" }}>
        <SectionTitle icon={Calendar}>Year-by-Year Breakdown</SectionTitle>
        <div style={{ display: "grid", gap: "12px" }}>
          {pariYears.map((t) => (
            <Card key={t.year} onClick={() => setPage({ id: "tournament-detail", year: t.year, tab: "pari" })} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "16px" }}>{t.year}</span>
                <span style={{ color: colors.textMuted, marginLeft: "12px", fontSize: "14px" }}>Pool: ${t.parimutuel.totalPool.toLocaleString()} &middot; {t.parimutuel.payoutMultiplier}x payout</span>
              </div>
              <ChevronRight size={18} color={colors.textMuted} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RULES PAGES
// ═══════════════════════════════════════════════════════════════

function RulesPage() {
  const mobile = useIsMobile();
  const rules = [
    { title: "USGA Rules", content: "USGA rules govern all play. If you do not know the basics about the USGA Rules of Golf, you should not be playing in the SGP Classic." },
    { title: "Format", items: [
      "Morning 18 | Net Best Ball — SGP Classic Rules Committee Modified Tees",
      "Afternoon 18 | Net Scramble — SGP Classic Rules Committee Modified Tees",
      "Team shot must be taken from 6 inches of marked spot. Stroke must be played from like-lie (ball in rough must remain in rough, ball in fairway must remain in fairway, ball on fringe must remain on fringe, ball in bunker must remain in bunker)",
    ]},
    { title: "Gimmes", alert: true, items: [
      "ABSOLUTELY NO GIMMES!",
      "Picking up a gimmie for a counting score will result in a one-shot penalty. (e.g. If you are putting for birdie and hit it to two inches and then pick up, you would need to replace your ball, replay the shot, add a one stroke penalty = your team would card a bogey.)",
      "No exceptions.",
      "Taking a gimme in the morning Net Best-Ball round will also lead to a DQ from the SGP Classic Gross Championship.",
    ]},
    { title: "Lost Ball", items: [
      "Maximum search time for lost ball = 3 minutes (please start at a timer when possible).",
      "If you lose your ball anywhere on the course (outside of a hazard), you may simply find the nearest point of the fairway in relation to your lost ball, drop for stroke and distance, and play your next shot with an effective \"two stroke penalty.\"",
      "Example: Drive into the trees (1), drop in the fairway (2, 3 = stroke & distance), next shot from fairway = 4.",
      "If you lose your ball near the green, the same ruling can apply — drop to the nearest point of fairway, no closer to the hole.",
    ]},
    { title: "Respect the Game", items: [
      "Follow the rules and enforce the rules where applicable in your group to protect the field.",
      "Rulings requiring additional clarification or discussion: please present to the SGP Classic Rules Committee after the round for a final decision.",
      "If unsure as to how to proceed during play: play two balls and seek a ruling with the SGP Classic Rules Committee after the round.",
    ]},
  ];

  return (
    <div>
      <SectionTitle icon={Flag}>Competition Rules</SectionTitle>
      <p style={{ color: colors.textMuted, marginBottom: "24px", fontSize: "15px" }}>Official SGP Classic tournament rules. All participants are expected to know and follow these rules.</p>

      <div style={{ display: "grid", gap: "16px" }}>
        {rules.map((section, i) => (
          <Card key={i} style={{ padding: mobile ? "16px" : "24px", borderLeft: section.alert ? "4px solid #dc2626" : `4px solid ${colors.green}` }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "17px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px", color: section.alert ? "#dc2626" : colors.greenDark }}>{section.title}</h3>
            {section.content && <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: colors.text }}>{section.content}</p>}
            {section.items && (
              <div style={{ display: "grid", gap: "8px" }}>
                {section.items.map((item, j) => (
                  <div key={j} style={{ fontSize: "14px", lineHeight: 1.6, color: colors.text, paddingLeft: "16px", borderLeft: `2px solid ${colors.border}` }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div style={{ marginTop: "32px", padding: "20px", background: "#f5f5f4", borderRadius: "12px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: colors.textMuted }}>May the best team win. — The SGP Rules Committee</p>
      </div>
    </div>
  );
}

function CourseGuidePage({ course, setPage }) {
  const mobile = useIsMobile();
  const [selectedHole, setSelectedHole] = useState(null);
  const totalHoles = 18;
  const isLegend = course === "legend";
  const courseName = isLegend ? "Legend" : "Legacy";
  const hasImages = isLegend;

  return (
    <div>
      <Breadcrumb items={[{ label: "Rules", onClick: () => setPage({ id: "rules" }) }, { label: `${courseName} Course Guide` }]} />
      <SectionTitle icon={MapPin}>{courseName} Course — Hazards & Boundaries</SectionTitle>

      {!hasImages ? (
        <Card style={{ padding: "40px", textAlign: "center" }}>
          <MapPin size={40} color={colors.textMuted} style={{ marginBottom: "12px" }} />
          <p style={{ fontSize: "16px", fontWeight: 600, color: colors.text, margin: "0 0 8px 0" }}>Coming Soon</p>
          <p style={{ fontSize: "14px", color: colors.textMuted, margin: 0 }}>{courseName} course boundary maps are being prepared and will be available before tournament day.</p>
        </Card>
      ) : (
        <div>
          {/* Legend */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "3px", background: "#dc2626" }} />
              <span style={{ fontSize: "13px", color: colors.textMuted }}>Hazard / Out of Bounds</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "3px", background: "#22c55e" }} />
              <span style={{ fontSize: "13px", color: colors.textMuted }}>Suggested Play Line</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "3px", background: "#06b6d4" }} />
              <span style={{ fontSize: "13px", color: colors.textMuted }}>Approach / Alternate Line</span>
            </div>
          </div>

          {/* Hole selector */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "24px", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedHole(null)}
              style={{
                padding: "8px 14px", borderRadius: "8px", border: "none", cursor: "pointer",
                background: selectedHole === null ? colors.greenDark : "#e5e5e5",
                color: selectedHole === null ? "white" : colors.text,
                fontWeight: 600, fontSize: "13px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase",
              }}
            >All Holes</button>
            {Array.from({ length: totalHoles }, (_, i) => i + 1).map((h) => (
              <button
                key={h}
                onClick={() => setSelectedHole(h)}
                style={{
                  width: "36px", height: "36px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: selectedHole === h ? colors.greenDark : "#e5e5e5",
                  color: selectedHole === h ? "white" : colors.text,
                  fontWeight: 700, fontSize: "14px",
                }}
              >{h}</button>
            ))}
          </div>

          {/* Hole images */}
          <div style={{ display: "grid", gap: "24px" }}>
            {Array.from({ length: totalHoles }, (_, i) => i + 1)
              .filter((h) => selectedHole === null || selectedHole === h)
              .map((h) => (
                <Card key={h} style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ background: colors.greenDark, padding: mobile ? "12px 16px" : "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "white", fontWeight: 700, fontSize: mobile ? "16px" : "18px", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Hole #{h}</span>
                    <span style={{ color: colors.goldLight, fontSize: "13px", fontWeight: 600 }}>
                      {COURSES.legend.holes[h - 1] ? `Par ${COURSES.legend.holes[h - 1].par} · ${COURSES.legend.holes[h - 1].yards} yds` : ""}
                    </span>
                  </div>
                  <img
                    src={process.env.PUBLIC_URL + `/holes/legend-hole-${h}.jpg`}
                    alt={`Legend Course Hole ${h} Hazards`}
                    style={{ width: "100%", display: "block" }}
                  />
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [page, setPageRaw] = useState({ id: "home" });
  const setPage = (p) => { setPageRaw(p); window.scrollTo(0, 0); };

  const getActiveNav = () => {
    if (page.id === "home") return "home";
    if (page.id.includes("tournament")) return "tournaments";
    if (page.id.includes("player")) return "players";
    if (page.id === "parimutuel") return "parimutuel";
    if (page.id === "rules" || page.id === "course-legend" || page.id === "course-legacy") return page.id;
    return "home";
  };

  const renderPage = () => {
    switch (page.id) {
      case "home":
        return <HomePage setPage={setPage} />;
      case "tournaments":
        return <TournamentsPage setPage={setPage} />;
      case "tournament-detail":
        return <TournamentDetailPage year={page.year} defaultTab={page.tab} setPage={setPage} />;
      case "players":
        return <PlayersPage setPage={setPage} />;
      case "player-detail":
        return <PlayerDetailPage name={page.name} setPage={setPage} />;
      case "parimutuel":
        return <ParimutuelPage setPage={setPage} />;
      case "rules":
        return <RulesPage />;
      case "course-legend":
        return <CourseGuidePage course="legend" setPage={setPage} />;
      case "course-legacy":
        return <CourseGuidePage course="legacy" setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const mobile = useIsMobile();

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Nav active={getActiveNav()} setPage={setPage} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: mobile ? "16px 12px" : "32px 24px" }}>
        {renderPage()}
      </div>
      <footer style={{ textAlign: "center", padding: "32px", color: colors.textMuted, fontSize: "13px", borderTop: `1px solid ${colors.border}` }}>
        <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>SGP Classic</span> &middot; Est. 2018 &middot; Woodington Lake Golf Club
      </footer>
    </div>
  );
}
