/*
    @SimpleProperty -> instance variables
    @SimpleFunction -> instance function
*/
package com.extensions.minimax;
import java.util.ArrayList;
import java.util.Random;

import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.runtime.AndroidNonvisibleComponent;
import com.google.appinventor.components.runtime.AndroidViewComponent;
import com.google.appinventor.components.runtime.ComponentContainer;
import com.google.appinventor.components.runtime.EventDispatcher;

import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.view.View;

@DesignerComponent(version = 1,
                    category = ComponentCategory.EXTENSION,
                    description = "Implementation of (a modified version of) the Minimax algorithm",
                    nonVisible = true,
                    iconName = "")


@SimpleObject(external = true)

public class Minimax extends AndroidNonvisibleComponent {
    private int X = 0;
    private int O = 1;
    private int noWinner = 3;
    private ArrayList<int[]> parent_node_scores;

    public int best_x = 0;
    public int best_y = 0;

    public int[] factorials = {
        1,
        2,
        6,
        24,
        120,
        720,
        5040,
        40320,
        362880    
    };


    public Minimax(ComponentContainer container) {
        super(container.$form());
    }   

    @SimpleProperty(description = "Optimal Move in X")
    public int BestMoveX()
    {
        return this.best_x;
    }

    @SimpleProperty(description = "Optimal Move in Y")
    public int BestMoveY()
    {
        return this.best_y;
    }

    // cannot directly pass list from app inventor
    @SimpleFunction(description = "")
    public void MiniMax(
        int you,
        int _00, int _01, int _02,
        int _10, int _11, int _12,
        int _20, int _21, int _22)
    {

        int[][] game_board = {
            {_00,  _01,  _02},
            {_10,  _11,  _12},
            {_20,  _21,  _22}
        };

        this.minimax(game_board, you);
    }

    @SimpleFunction(description="")
    public int getRandom() 
    {
        double __random =  ();
        return __random > 0.5 ? 1 : 0;
    }

    /**
     * find the winner of a tic tac toe board
     * 
     * @param board, int[3][3] must contain 1 for x, 0 for o, 50 for empty
     * @return int: 0 -> O won, 1 -> X won, 3 -> No one won (this.X, this.O, this.noWinner)
     */
    public int getWinner(int[][] board)
    {
        // Check Horizoontally
        for (int y=0; y < 3; y++)
        {
            int row_sum = 0;
            for (int x=0; x < 3; x++)
                row_sum += board[y][x];

            switch (row_sum) {
                case 0:
                    return this.X;
                case 3:
                    return this.O;
            }
        }

        // check Vertically 
        for (int x=0; x < 3; x++)
        {
            int col_sum = 0;
            for (int y=0; y < 3; y++)
                col_sum += board[y][x];
            
            switch (col_sum)
            {
                case 0:
                    return this.X;
                case 3:
                    return this.O;
            }
        }

        // Left Diagnal
        {
            int d_sum_left = 0;
            for (int i=0; i < 3; i++)
            {
                d_sum_left += board[i][i];
            }    


            switch (d_sum_left)
            {
                case 0:
                    return this.X;
                case 3:
                    return this.O;
            }

        }

        // Right diagnal
        {
            int d_sum_right = 0;
            for (int i=2, j=0; i >= 0; i--, j++)
            {
                d_sum_right += board[j][i];
            }    


            switch (d_sum_right)
            {
                case 0:
                    return this.X;
                case 3:
                    return this.O;
            }
        }

        return this.noWinner;
    }


    // copy 2d array https://stackoverflow.com/questions/5617016/how-do-i-copy-a-2-dimensional-array-in-java
    public static int[][] copy(int[][] src) {
        int length = src.length;
        int[][] target = new int[length][src[0].length];
        for (int i = 0; i < length; i++) {
            System.arraycopy(src[i], 0, target[i], 0, src[i].length);
        }
        return target;
    }


    public void find_max_score()
    {
        int max_value = this.parent_node_scores.get(0)[2];
        int max_index = 0;
        for (int i=1; i < this.parent_node_scores.size(); i++)
        {
            int value = this.parent_node_scores.get(i)[2];
            if ( value > max_value )
            {
                max_value = value;
                max_index = i;
            }
        }

        this.best_y = this.parent_node_scores.get(max_index)[0];
        this.best_x = this.parent_node_scores.get(max_index)[1];
    }


    /**
     * Implementation of (a modified version) of the minimax algorithm
     * Check all the possible moves in the game board and find 
     * the one that wins the game the quickest (according to @param depth),
     * or does not lose quickly. (output stored in this.x, this.y)
     * 
     * @param game_board, int[][] (for details see int getWinner)
     * @param you, either this.X or this.O, specifies on what team the AI is.
     */
    public void minimax(int[][] game_board, int you)
    {
        int count = 0;
        this.parent_node_scores = new ArrayList<int[]>();

        for (int y=0; y < 3; y++)
        {
            for (int x=0; x < 3; x++)
            {
                if (game_board[y][x] != 50)
                    continue;

                // {y, x, score}                
                this.parent_node_scores.add( new int[] {y, x, 0} );

                int[][] copy_board = copy(game_board);
                copy_board[y][x] = you;
    
                int winner = this.getWinner(copy_board);

                if (winner == you) // instant win (must be chosen at all costs)
                {
                    this.parent_node_scores.get(count)[2] += 3628800;
                }           
                else if (winner != this.noWinner) // instant lose (probably impossible for this to occur)
                {
                    this.parent_node_scores.get(count)[2] -= 3628800;
                } 
                else { // no win, no lose
                    this.minimax_iteration(copy_board, /*!you*/ you == this.X ? this.O : this.X, you, count, 1);
                }
                count++;
            }
        }        
        this.find_max_score();
    }


    public void minimax_iteration(int[][] board, int turn, int you, int parent_node, int depth)
    {
        for (int y=0; y < 3; y++)
        {
            for (int x=0; x < 3; x++)
            {
                if (board[y][x] != 50)
                    continue;
                    
                int[][] b_copy = copy(board);
                b_copy[y][x] = turn;
    
                int winner = this.getWinner(b_copy);      
                
                if (winner == you)  // win points++;
                {
                    this.parent_node_scores.get(parent_node)[2] += factorials[9 - depth] * 1;    
                    return;
                }
                else if (winner != this.noWinner) // Lose points--;
                {
                    this.parent_node_scores.get(parent_node)[2] -= factorials[9 - depth] * 2;    
                    return;
                }
    
                this.minimax_iteration(b_copy, turn == this.X ? this.O : this.X, you, parent_node, depth + 1);
            }
        }
    }


}

