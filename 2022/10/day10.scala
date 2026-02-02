package aoc2022

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

object Day10 {

    def partOne(): (Int, Double) = {
        val filename = "2022/10/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val solution = input
            .split("\r?\n")
            .map { i => 
                val parts = i.split(" ")
                parts match {
                    case Array(a, b) => (a, b.toInt)
                    case Array(a) => (a, 0)
                }  
            }
            .foldLeft( (1, 1, Vector.empty[(Int, Int)]) ) { case ( (cycle, x, twenties), (cmd, value)) =>
                
                val cyclesToCover = if (cmd == "addx") List(cycle, cycle+1) else List(cycle)

                val updatedTwenties = cyclesToCover.foldLeft(twenties) { (accTwenties, c) => 
                    if ((c-20) % 40 == 0) {
                        accTwenties :+ (c, x)
                    } else accTwenties
                }

                val nextX = if (cmd== "addx") x + value else x
                val nextCycle = cycle + cyclesToCover.length

                (nextCycle, nextX, updatedTwenties)
            }
            ._3
            .foldLeft(0) { case (acc, i) =>
                acc + i(0) * i(1)
            }
            
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    // solution based on 4HbQ's parsing approach on Reddit
    def partOne4HbQ() : (Int, Double) = {
        val filename = "2022/10/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val solution = input
            .split("""\s+""")
            .map { i => i.toIntOption.getOrElse(0) }
            .foldLeft ( (1, 1, Vector.empty[(Int, Int)]) ) { case ((cycle, x, twenties), value) =>
                (cycle + 1,  x + value, if ((cycle-20) % 40 == 0 ) twenties :+ (cycle, x) else twenties)
            }
            ._3
            .foldLeft(0) { case (acc, i) =>
                acc + i(0) * i(1)
            }

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def partTwo(): (Int, Double) = {
        val filename = "2022/10/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val initialGrid = Vector.fill(6, 40)(".")

        val solution = input
            .split("""\s+""")
            .map { i => i.toIntOption.getOrElse(0) }
            .foldLeft ( (1, 1, initialGrid) ) { case ((cycle, x, currentGrid), value) =>

                val currentRow = (cycle-1) / 40
                val currentCol = (cycle-1) % 40

                val nextGrid = if (currentCol >= x - 1 && currentCol <= x + 1) {
                    currentGrid.updated(currentRow, currentGrid(currentRow).updated(currentCol, "#"))
                } else {
                    currentGrid
                }

                (cycle + 1,  x + value, nextGrid)
            }._3
            .map { r =>
                r.map { c => 
                    print(c)
                }
                print("\n")
            }

        val duration = (System.nanoTime() - startTime) / 1e6

        (0, duration)
    }

}

@main def run10(): Unit = {
    val (p1, d1) = Day10.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day10.partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}