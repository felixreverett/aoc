package aoc2022.day01

import scala.io.Source
import java.io.File

def partOne(): (Int, Double) = {
    val filename = "2022/01/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val result = input
        .split("\r?\n\r?\n")
        .toList
        .map { group =>
            group
                .split("\n")
                .map(_.trim)
                .filter(_.nonEmpty)
                .map(_.toInt)
                .toList
                .sum
        }
        .max

    val duration = (System.nanoTime() - startTime) / 1e6

    (result, duration)
}

def partTwo(): (Int, Double) = {
    val filename = "2022/01/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val result = input
        .split("\r?\n\r?\n")
        .view
        .map { group =>
            group.split("\n").flatMap(_.trim.toIntOption).sum
        }
        .toList
        .sorted(using Ordering.Int.reverse)
        .take(3)
        .sum

    val duration = (System.nanoTime() - startTime) / 1e6

    (result, duration)
}

@main def run(): Unit = {
    val (p1, d1) = partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}