package aoc2022.day7

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string
import scala.collection.mutable

class Folder(val name: String, val parent: String) {
    var subfolders = mutable.ArrayBuffer[String]()
    var files = mutable.ArrayBuffer[String]()
    var totalSize: Long = 0
}

def partOne(): (Int, Double) = {
    val filename = "2022/07/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val initialDirs = Map("/" -> new Folder("/", ""))
    var currentPath = List.empty[String]

    val directories = input
        .split("\r?\n")
        .map(_.split(" "))
        .foldLeft(initialDirs) { (acc, i) =>
            val cwdKey = "/" + currentPath.mkString("/")

            i(0) match
                case "$" => {
                    i(1) match
                        case "cd" => {
                            i(2) match
                                case ".." => currentPath = currentPath.dropRight(1)
                                case "/" => currentPath = List.empty
                                case target => currentPath = currentPath :+ target
                        }
                            acc
                        case "ls" => acc
                }
                case "dir" => {
                    val newFolderName = i(1)
                    val fullPath = ("/" + (currentPath :+ newFolderName).mkString("/"))
                    if (!acc.contains(fullPath)) acc + (fullPath -> new Folder(newFolderName, cwdKey))
                    else acc
                }
                case sizeStr if sizeStr.forall(_.isDigit) => {
                    val fileSize = sizeStr.toLong
                    acc(cwdKey).totalSize += sizeStr.toLong
                    acc
                }
                case _ => acc
        }

    val allFolderSizes = directories.keys.map { targetPath =>
        directories.map { case (folderPath, folderObj) =>
            val isChild = if (targetPath == "/") true 
                        else folderPath == targetPath || folderPath.startsWith(targetPath + "/")
            
            if (isChild) folderObj.totalSize else 0L
        }.sum
    }

    val solution = allFolderSizes
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