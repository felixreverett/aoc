package aoc2022.day7

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string
import scala.collection.mutable

def partOne(): (Int, Double) = {
    val filename = "2022/07/input.txt"
    val input = Source.fromFile(new File(filename)).mkString
    val startTime = System.nanoTime()

    val initialAcc = (Map("/" -> 0L), List.empty[String])

    val (directories, _) = input
        .split("\r?\n")
        .map(_.split(" "))
        .foldLeft(initialAcc) { case ((acc, path), instruction) =>
            val cwdKey = "/" + path.mkString("/")

            instruction match {
                case Array("$", "cd", "..") => (acc, path.dropRight(1))
                case Array("$", "cd", "/") => (acc, List.empty)
                case Array("$", "cd", target) => (acc, path :+ target)
                case Array("$", "ls") => (acc, path)
                case Array("dir", dirName) => {
                    val fullPath = "/" + (path :+ dirName).mkString("/")
                    if (!acc.contains(fullPath)) (acc + (fullPath -> 0L), path)
                    else (acc, path)
                }
                case Array(sizeStr, _) if sizeStr.forall(_.isDigit) => {
                    val fileSize = sizeStr.toLong
                    val pathsToUpdate = (0 to path.length).map { i =>
                        "/" + path.take(i).mkString("/")
                    }
                    val updatedDirs = pathsToUpdate.foldLeft(acc) { (accMap, p) => 
                        val currentSize = accMap.getOrElse(p, 0L)
                        accMap + (p -> (currentSize + fileSize))
                    }
                    (updatedDirs, path)
                }
                case _ => (acc, path)
            }
        }

    val solution = directories
        .values
        .filter(_ <= 100000)
        .sum
        .toInt

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