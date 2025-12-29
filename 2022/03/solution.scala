package aoc2022.day03

import scala.io.Source
import java.io.File

def partOne(): (Int, Double) = {
    val filename = "2022/03/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()
    
    val solution = input
        .split("\r?\n")
        .filter(_.trim.nonEmpty)
        .map { line =>
            val (left, right) = line.splitAt(line.length/2)
            val common = left.intersect(right).head
            if (common.isUpper) (common & 31) + 26 else (common & 31)
        }
        .sum

    val duration = (System.nanoTime() - startTime) / 1e6

    (solution, duration)
}

@main def run(): Unit = {
    val (p1, d1) = partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    //val (p2, d2) = partTwo()
    //println(s"Part 2 Solution: ${p2}")
    //println(s"Time Part 2: ${d2}ms")
}