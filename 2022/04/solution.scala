package aoc2022.day04

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

case class Range(start: Int, end: Int) {
    def contains(other: Range): Boolean = 
        this.start <= other.start && this.end >= other.end

    def overlaps(other: Range): Boolean =
        this.start <= other.end && other.start <= this.end
}

def partOne(): (Int, Double) = {
    val filename = "2022/04/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()
    
    val solution = input
        .split("\r?\n")
        .view
        .filter(_.trim.nonEmpty)
        .map { 
            case s"${s1}-${e1},${s2}-${e2}" =>
                (Range(s1.toInt, e1.toInt), Range(s2.toInt, e2.toInt))
        }
        .count { (rangeA, rangeB) =>
            rangeA.contains(rangeB) || rangeB.contains(rangeA)
        }

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