import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js";
import { userModel } from '../models/Users.js';

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID)
        const user = await userModel.findById(req.body.userID)
        user.savedRecipe.push(recipe)
        await user.save()
        res.json({savedRecipes: user.savedRecipe})
    } catch (err) {
        res.json(err)
    }
})

router.delete("/", async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userID) 
        const unsaveRecipe = await RecipeModel.deleteOne(req.body.recipeID)
        await user.save()
    } catch (err) {
        res.json(err)
    }
})

router.get("/saved-recipes/ids/:userID", async (req, res) => {
    try {
        const user= await userModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipe})
    } catch (err) {
        res.json(err)
    }
})

router.get("/saved-recipes/:userID", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userID)
        const savedRecipe = await RecipeModel.find({_id: {$in: user.savedRecipe}})
        res.json({savedRecipe})
    } catch (err) {
        res.json(err)
    }
})


export { router as recipesRouter }