package aoc2022

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

object Day11 {

    case class Monkey(
        id: Int,
        items: List[Int],
        operation: Int => Int,
        test: Int => Boolean,
        ifTrue: Int,
        ifFalse: Int,
        inspectedItems: Int
    )

    def partOne(): (Int, Double) = {
        val filename = "2022/11/sample-input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val solution = input
            .split("\r?\n\r?\n")
            .map { monkey => 
                val lines = monkey.split("\r?\n")
                val id = lines(0).replace("Monkey")
            }
            
            
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

}

@main def run11(): Unit = {
    val (p1, d1) = Day11.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    //val (p2, d2) = Day11.partTwo()
    //println(s"Part 2 Solution: ${p2}")
    //println(s"Time Part 2: ${d2}ms")
}