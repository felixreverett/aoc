package aoc2022

import java.io.File
import java.io.FileNotFoundException

import scala.annotation.tailrec
import scala.collection.immutable.Queue
import scala.compiletime.ops.string
import scala.io.Source

@main def run12(): Unit = {
    val (p1, d1) = Day12.partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")
}

object Day12 {

    def partOne(): (Int, Double) = {

        val filename = "12/input.txt"

        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        // 1) parse the input into a heightmap
        val heightMap: Vector[Vector[Char]] = input
            .split("\r?\n")
            .toVector
            .map { _.toVector }


        // 2) find the coordinates of startPoint and endPoint
        val (startPoint: (Int, Int), endPoint: (Int, Int)) = try {
            
            val targetSearch = for {
                (rowList, rowIndex) <- heightMap.iterator.zipWithIndex
                (char, colIndex) <- rowList.iterator.zipWithIndex
                if char == 'S' || char == 'E'
            } yield char -> (rowIndex, colIndex)

            val resultsMap = targetSearch.take(2).toMap

            val startPt = resultsMap.get('S')
            val endPt = resultsMap.get('E')

            (startPt, endPt) match {
                case (Some(s), Some(e)) => (s, e)
                case _ => throw new Exception("Grid is missing Start and/or End points")
            }
        } catch {
            case e: Exception => {
                println(s"[!] Grid parsing failed: ${e.getMessage}")
                sys.exit(1)
            }
        }

        val solution = heightMap.doDijkstras(startPoint, endPoint)

        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def partTwo(): (Int, Double) = {

        val filename = "12/input.txt"

        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        val solution: Int = 0; val duration: Double = 0

        (solution, duration)
    }

    case class Node(
        id: (Int, Int),
        weight: Int
    )

    extension (heightMap: Vector[Vector[Char]]) {

        def doDijkstras(startPoint: (Int, Int), endPoint: (Int, Int)): Int = {

            @tailrec
            def search(
                queue: Queue[Node],
                visited: Set[(Int, Int)],
            ): Int = {

                queue.dequeueOption match {

                    case None =>
                        Int.MaxValue

                    case Some((current, rest)) if current.id == endPoint =>
                        current.weight

                    case Some((current, rest)) =>

                        val neighbours = heightMap.getValidNeighbours(current.id._1, current.id._2)
                            .filter { coord => !visited.contains(coord)
                            }

                        val neighbourNodes = neighbours
                            .map { case (r, c) =>
                                Node(id = (r, c), weight = current.weight + 1)    
                            }

                        val nextQueue = rest.enqueueAll(neighbourNodes)
                        val nextVisited = visited ++ neighbours

                        search(nextQueue, nextVisited)
                }
            }

            search(Queue(Node(startPoint, 0)), Set(startPoint))
        } 

        /**
         * Returns a list of all valid neighbours for a given character on the heightMap
        */
        def getValidNeighbours(currentRow: Int, currentCol: Int): List[(Int, Int)] = {

            List(
                (currentRow - 1, currentCol),
                (currentRow + 1, currentCol),
                (currentRow, currentCol - 1),
                (currentRow, currentCol + 1)
            ).filter { case (r, c) =>
                r >= 0 && r < heightMap.length &&
                c >= 0 && c < heightMap(r).length &&
                heightMap(currentRow)(currentCol).getElevation - heightMap(r)(c).getElevation >= -1
            }
        }
    }

    extension (c: Char) {
        def getElevation: Int = c match {
            case 'S' => 'a'.toInt
            case 'E' => 'z'.toInt
            case any => any.toInt
        }
    }

}