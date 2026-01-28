package aoc2022

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

object Day09 {

    def partOne(): (Int, Double) = {
        val filename = "2022/09/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val solution = input
            .split("\r?\n")
            .map { i => 
                val parts = i.split(" ")
                val dir = parts(0)
                val mag = parts(1).toInt
                (dir, mag)    
            }
            .foldLeft( (Set("0,0"), (0,0), (0,0)) ) { 
                case ( (visitedCoords, headPos, tailPos), (direction, magnitude) ) =>

                    val vector = direction.head match {
                        case 'R' =>
                            (0, 1)
                        case 'U' =>
                            (-1, 0)
                        case 'L' =>
                            (0, -1)
                        case _ =>
                            (1,0)
                    }

                    // returning this part, so I don't need to assign it a variable name
                    val (endVis, endH, endT, _) = (1 to magnitude)
                        .foldLeft( (visitedCoords, headPos, tailPos, vector) ) { 
                            case ( (visitedCoords, hP, tP, vec), _) =>

                                val newhP = (hP._1 + vec._1, hP._2 + vec._2) // type (int, int)

                                val rDiff = newhP._1 - tP._1
                                val cDiff = newhP._2 - tP._2

                                val newtP = if (math.abs(rDiff) > 1 || math.abs(cDiff) > 1) {
                                    (tP._1 + math.signum(rDiff), tP._2 + math.signum(cDiff))
                                } else {
                                    tP
                                }

                                (visitedCoords + s"${newtP._1},${newtP._2}", newhP, newtP, vec)
                        }

                    (endVis, endH, endT)
            }
            ._1
            .size

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def partTwo(): (Int, Double) = {
        val filename = "2022/09/input.txt"
        val input = Source.fromFile(new File(filename)).mkString
        val startTime = System.nanoTime()

        val initialChain = Vector((0, 0), (0, 0), (0, 0), (0, 0), (0, 0), (0, 0), (0, 0), (0, 0), (0, 0), (0, 0))

        val solution = input
            .split("\r?\n")
            .map { i =>
                val parts = i.split(" ")
                val dir = parts(0)
                val mag = parts(1).toInt
                (dir, mag)
            }
            
            .foldLeft( (Set("0,0"), initialChain) ) { 
                case ( (visitedCoords, chain), (direction, magnitude) ) =>

                    val vector = direction.head match {
                        case 'R' =>
                            (0, 1)
                        case 'U' =>
                            (-1, 0)
                        case ('L') =>
                            (0, -1)
                        case _ =>
                            (1, 0)
                    }

                    val (finalCoordsSet, finalChain, _) = (1 to magnitude)
                        .foldLeft ((visitedCoords, chain, vector)) {
                            case ( ( visitedCoords, chain, vec), _ ) =>

                                val newHead = (chain(0)._1 + vec._1, chain(0)._2 + vec._2)

                                val headMovedChain = chain.updated(0, newHead)
                            
                                val updatedChain = (1 until headMovedChain.length)
                                    .foldLeft ( headMovedChain ) {
                                        case ( accChain, i ) =>

                                            val prev = accChain(i-1)
                                            val curr = accChain(i)

                                            val rDiff = prev._1 - curr._1
                                            val cDiff = prev._2 - curr._2

                                            if (math.abs(rDiff) > 1 || math.abs(cDiff) > 1) {
                                                val newKnot = (curr._1 + math.signum(rDiff.toDouble).toInt,
                                                        curr._2 + math.signum(cDiff.toDouble).toInt)
                                                accChain.updated(i, newKnot)
                                            } else {
                                                accChain
                                            }
                                    }

                                (visitedCoords + s"${updatedChain.last._1},${updatedChain.last._2}", updatedChain, vec)
                        }

                    (finalCoordsSet, finalChain)
            }
            ._1
            .size
        
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }
}

@main def run09(): Unit = {
    val (p1, d1) = Day09.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day09.partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}