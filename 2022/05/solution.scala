package aoc2022.day5

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

def partOne(): (Int, Double) = {
    val filename = "2022/05/sample-input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val solution = input
        .split("""(\r?\n){2}""")
        .toList match {
            case List(s, i) =>
                val stacks = s
                    .split("""(\r?\n)""")
                    .map(line => line.grouped(4).map(_.charAt(1)).toArray)
                    .transpose
                    .map(_.filter(_.isLetter).reverse)
                val instructions = i
                    .split("\r?\n")
                    .map { 
                        case s"move $amount from $src to $dest" =>
                            (amount.toInt, src.toInt, dest.toInt)
                    }
                (stacks, instructions)
            case _ => throw new Exception("Could not split into stacks and instructions")
        }
        .map { (stacks, instructions) =>
            instructions.foreach { i =>
                (0 until i[0]).foreach {
                    movedVal = stacks[i][1].pop
                    stacks[i][2].push(movedVal)
                }
            }
        }

    val (stacks, _) = solution

    println("Current State of Stacks:")
    stacks.indices.foreach { i =>
        val content = stacks(i).mkString(" ")
        println(s"${i + 1} | $content")
        }

    (1, 1.0f)
}

@main def run(): Unit = {
    val (p1, d1) = partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    //val (p2, d2) = partTwo()
    //println(s"Part 2 Solution: ${p2}")
    //println(s"Time Part 2: ${d2}ms")
}