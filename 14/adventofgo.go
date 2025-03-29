package main

// Simple helper code to speed up my data parsing in Go

import "strings"

// = = = = = = = = = =

type AogString string

func (a AogString) ReplaceAll(from, to string) AogString {
	return AogString(strings.ReplaceAll(string(a), from, to))
}

func (a AogString) Split(separator string) AogStringArray {
	splitInput := strings.Split(string(a), separator)
	var array AogStringArray
	for _, split := range splitInput {
		array = append(array, AogString(split))
	}
	return array
}

// = = = = = = = = = =

type AogStringArray []AogString

func (a AogStringArray) ToStringArray() []string {
	var array []string
	for _, val := range a {
		array = append(array, string(val))
	}
	return array
}
