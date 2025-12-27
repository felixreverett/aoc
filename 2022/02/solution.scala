package aoc2022.day02

import scala.io.Source
import java.io.File

def XYZScore(c: String): Int = {
    c match
        case "Z" => 3
        case "Y" => 2
        case "X" => 1
}

def partOne(): Int = {
    val filename = "2022/02/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val rounds = input
        .split("\r?\n")
        .filter(_.trim.nonEmpty)
        .map { line =>
            val parts = line.split(" ")
            (parts(0), parts(1))
        }

    rounds.map { (i, j) =>
        (i, j) match
            case ("A", "Y") | ("B", "Z") | ("C", "X") => 6 + XYZScore(j)
            case ("A", "X") | ("B", "Y") | ("C", "Z") => 3 + XYZScore(j)
            case _ => XYZScore(j)
    }.sum
}

def XYZScore2(i: String, j: String): Int = {
    j match
        case "Z" => i match // need to win
            case "A" => 2 // would play paper
            case "B" => 3 // would play scissors
            case "C" => 1 // would play rock
        case "Y" => i match // need to draw
            case "A" => 1 // would play rock
            case "B" => 2 // would play paper
            case "C" => 3 // would play scissors
        case "X" => i match // need to lose
            case "A" => 3 // would play scissors
            case "B" => 1 // would play rock
            case "C" => 2 // would play paper
}

def partTwo(): Int = {
    val filename = "2022/02/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val rounds = input
        .split("\r?\n")
        .filter(_.trim.nonEmpty)
        .map { line =>
            val parts = line.split(" ")
            (parts(0), parts(1))
        }

    rounds.map { (i, j) =>
        (i, j) match
            // need to win
            case ("A", "Z") | ("B", "Z") | ("C", "Z") => 6 + XYZScore2(i, j)
            // need to draw
            case ("A", "Y") | ("B", "Y") | ("C", "Y") => 3 + XYZScore2(i, j)
            // need to lose
            case _ => XYZScore2(i, j)
    }.sum
}

@main def run(): Unit = {
    val s1 = System.nanoTime()
    val p1 = partOne()
    val d1 = (System.nanoTime() - s1) / 1e6
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val s2 = System.nanoTime()
    val p2 = partTwo()
    val d2 = (System.nanoTime() - s2) / 1e6
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}