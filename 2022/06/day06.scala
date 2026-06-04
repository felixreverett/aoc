package aoc2022

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string
import java.io.FileNotFoundException

object Day06 {

    def partOne(): (Int, Double) = {
        val filename = "06/input.txt"
        
        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        val solution = input
            .sliding(4)
            .zipWithIndex
            .find { case (str, i) =>
                str.distinct.length == 4 
            }
            .map { case (str, i) => i }
            .getOrElse(0) + 4

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def partTwo(): (Int, Double) = {
        val filename = "06/input.txt"
        
        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        val solution = input
            .sliding(14)
            .zipWithIndex
            .find { case (str, i) =>
                str.distinct.length == 14 
            }
            .map { case (str, i) => i }
            .getOrElse(0) + 14

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }
}

@main def run06(): Unit = {
    val (p1, d1) = Day06.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day06.partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}