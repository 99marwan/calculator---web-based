package com.danvega.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {

    private String result = " ";

    @GetMapping("/calc/f1")
    public String result(){
        return this.result;
    }
    

    @PostMapping("/calc/f2")
    public void add(@RequestBody  String x){
        if(x.contains("+")){
            String[] arr = x.split("\\+", 2);
            double res = Double.parseDouble(arr[0])+Double.parseDouble(arr[1]);
            String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }
        }
        else if(x.contains("*")){
            String[] arr = x.split("\\*", 2);
            double res = Double.parseDouble(arr[0])*Double.parseDouble(arr[1]);
            String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }
        }
        else if(x.contains("/")){
            String[] arr = x.split("\\/", 2);
            if(Double.parseDouble(arr[1]) == 0){
                this.result = "cannot divide by zero";
            }
            else{
                double res =Double.parseDouble(arr[0])/Double.parseDouble(arr[1]);
                String s = Double.toString(res);
                if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                    this.result=String.valueOf((long) res);
                }
                else {
                    this.result = s;
                }
            }
        }
        else if(x.contains("-")){
            String [] arr;
            if(x.charAt(0)=='-'){
                String temp = x.substring(1);
                arr = temp.split("\\-", 2);
                arr[0] = "-"+arr[0];
            }
            else{ 
               arr = x.split("\\-", 2);
            }
            double res = Double.parseDouble(arr[0])-Double.parseDouble(arr[1]);
            String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }

        }   
    }

    @PostMapping("/calc/f3")
    public void square(@RequestBody String x){
        double res = Double.parseDouble(x)*Double.parseDouble(x);
        String s = Double.toString(res);
        if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
            this.result=String.valueOf((long) res);
        }
        else {
                this.result = s; 
        }
    }

    @PostMapping("/calc/f4")
    public void squareRoot(@RequestBody String x){
        if(x.charAt(0) == '-')
            this.result = "invalid input";
        else{
            double res = Math.sqrt(Double.parseDouble(x));
            String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }

        }
    }
    @PostMapping("/calc/f5")
    public void oneOverX(@RequestBody String x){
        if((Double.parseDouble(x))==0){
            this.result = "cannot divide by zero";
        }
        else{
            double res = 1/Double.parseDouble(x);
            String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }
        }
    }

    @PostMapping("/calc/f6")
    public void percent(@RequestBody String x){
        double res = Double.parseDouble(x)/100;
        String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }
    }

    @PostMapping("/calc/f7")
    public void negative(@RequestBody String x){
        double res = Double.parseDouble(x)*-1;
        String s = Double.toString(res);
            if((s.charAt(s.length()-1)=='0') && (s.charAt(s.length()-2)=='.')){
                this.result=String.valueOf((long) res);
            }
            else {
                this.result = s;
            }
    }
    
}
