package aoc2022.day04

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

def partOne(): (Int, Double) = {
    val filename = "2022/04/sample-input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()
    
    val solution = 1

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