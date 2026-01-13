package aoc2022.day8

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

// pass through each row except rows 0 and n both ways, storing visible coords in a set
// then pass through each col except columns 0 and n
// add 4 as we will never cross the very corners

def getVisible(grid: Array[Array[(Int, Int, Int)]]): Set[String] = {
    grid.foldLeft(Set[String]()) { (accSet, row) =>
        val (rowSet, _) = row.foldLeft((Set[String](), -1)) {
            case ((currentSet, maxH), (height, r, c)) =>
                if (height > maxH) {
                    (currentSet + s"$r-$c", height)
                } else {
                    (currentSet, maxH)
                }
        }    
        accSet ++ rowSet
    }
}

def partOne(): (Int, Double) = {
    val filename = "2022/08/input.txt"
    val input = Source.fromFile(new File(filename)).mkString
    val startTime = System.nanoTime()

    val treeGrid = input
        .split("\r?\n")
        .zipWithIndex
        .map { case (line, row) =>
            line
                .split("")
                .zipWithIndex
                .map { case (value, col) => (value.toInt, row, col) }
        }

    val fromLeft = getVisible(treeGrid)
    val fromRight = getVisible(treeGrid.map(_.reverse))
    val fromTop = getVisible(treeGrid.transpose)
    val fromBottom = getVisible(treeGrid.transpose.map(_.reverse))

    val solution = (fromLeft | fromRight | fromTop | fromBottom ).size
    
    val duration = (System.nanoTime() - startTime) / 1e6

    (solution, duration)
}

def isInBounds(grid: Array[Array[(Int, Int, Int)]], r: Int, c: Int): Boolean = {
    r >= 0 && r < grid.length && c >= 0 && c < grid(r).length
}

def getViewingDistance(grid: Array[Array[(Int, Int, Int)]], r: Int, c: Int, rChange: Int, cChange: Int, startHeight: Int): Int = {
    val lazyPath = Iterator.iterate((r + rChange, c + cChange)) { case (currR, currC) =>
        (currR + rChange, currC + cChange)    
    }

    lazyPath
        .takeWhile { case (r, c) => isInBounds(grid, r, c) && grid(r)(c)(0) < startHeight }
        .size       
}

def partTwo(): (Int, Double) = {
    val filename = "2022/08/sample-input.txt"
    val input = Source.fromFile(new File(filename)).mkString
    val startTime = System.nanoTime()

    val treeGrid = input
        .split("\r?\n")
        .zipWithIndex
        .map { case (line, row) =>
            line
                .split("")
                .zipWithIndex
                .map { case (value, col) => (value.toInt, row, col) }
        }

    val allCoordinates = for {
        r <- 0 until treeGrid.length
        c <- 0 until treeGrid(0).length
    } yield (r, c)

    val solution = allCoordinates
        .foldLeft(0) { (acc, coords) =>
            val (r, c) = coords
            val (currentVal, _, _) = treeGrid(r)(c)

            val mult = getViewingDistance(treeGrid, r, c, -1, 0, currentVal)    // ^
                * getViewingDistance(treeGrid, r, c, 0, 1, currentVal)          // >
                * getViewingDistance(treeGrid, r, c, 1, 0, currentVal)          // v
                * getViewingDistance(treeGrid, r, c, 0, -1, currentVal)         // <
            
            if mult > acc then { mult 
            } else {
                acc
            }
        }

    val duration = (System.nanoTime() - startTime) / 1e6

    (solution, duration)
}

@main def run(): Unit = {
    val (p1, d1) = partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}