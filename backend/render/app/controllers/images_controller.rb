class ImagesController < ApplicationController

    def index
        @images = Image.all
        render json: @images
    end

    def show
        @image = Image.find(params[:id]) 
        render json: @image
    end

    def create
        url = params[:url]
        likes = params[:likes]
        @image = Image.create(url: url, likes: likes)
        
        render json: @image
    end

    def update
        @image = Image.find(params[:id])
        @image.update(url: params[:image][:url], likes: params[:image][:likes])
    end

    def destroy
        @image = Image.find(params[:id])
        @image.destroy
        head :no_content
    end

    private

    def image_params
        params.require(:image).permit(:id, :url, :likes)
    end
        
end
