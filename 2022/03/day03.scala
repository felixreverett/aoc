package aoc2022

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

object Day03 {

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
                convertToPriority(common)
            }
            .sum

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def convertToPriority(c: Char): Int = {
        if (c.isUpper) (c & 31) + 26 else (c & 31)
    }

    // Finds the intersecting values of n strings
    def findIntersect(strings: Seq[String]): String = {
        var overlaps = strings(0)

        for (i <- 1 until strings.length) do 
            val currentString = strings(i)
            overlaps = currentString.filter(c => overlaps.contains(c)).distinct

        overlaps
    }

    def partTwo(): (Int, Double) = {
        val filename = "2022/03/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val solution = input
            .split("\r?\n")
            .filter(_.trim.nonEmpty)
            .grouped(3)
            .map { group =>
                val commonStr = findIntersect(group.toArray)
                convertToPriority(commonStr.head)
            }
            .sum
        
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }
}

@main def run03(): Unit = {
    val (p1, d1) = Day03.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day03.partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}