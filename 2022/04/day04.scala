package aoc2022

import scala.io.Source
import java.io.File
import java.io.FileNotFoundException
import scala.compiletime.ops.string

object Day04 {

    case class Range(start: Int, end: Int) {
        def contains(other: Range): Boolean = 
            this.start <= other.start && this.end >= other.end

        def overlaps(other: Range): Boolean =
            this.start <= other.end && other.start <= this.end
    }

    def partOne(): (Int, Double) = {
        val filename = "04/input.txt"
        
        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

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

    def partTwo(): (Int, Double) = {
        val filename = "04/input.txt"
        
        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

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
                rangeA.overlaps(rangeB) || rangeB.overlaps(rangeA)
            }

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }
}

@main def run04(): Unit = {
    val (p1, d1) = Day04.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day04.partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}