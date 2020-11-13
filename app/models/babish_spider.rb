class BabishSpider < Kimurai::Base
    @name = 'babish_spider'
    @engine = :mechanize

    def self.process(url)
        @start_urls = [url]
        self.crawl!
    end

    def parse(response, url:, data: {})
        recipe_urls = []
        response.xpath("//a[@class='summary-title-link']").each do |recipe_thumbnail|
            recipe_urls.push(recipe_thumbnail['href'])
        end

        recipe_urls = ['/basicsepisodes/pasta-al-limone'] # for debugging
        recipe_urls.each do |recipe_url|
            item = {}
            ingredients = {}
            instructions = []
            link = 'https://basicswithbabish.co' + recipe_url
            browser.visit(link)
            recipe_page = browser.current_response

            ingredient_names = recipe_page.xpath("///html/body/div[4]/div[2]/div/main/section/article/div[1]/div/div/div[4]/div[1]/div/div/p/strong")
            ingredient_lists = recipe_page.xpath("///html/body/div[4]/div[2]/div/main/section/article/div[1]/div/div/div[4]/div[1]/div/div/ul")
            instruction_names = recipe_page.xpath("///html/body/div[4]/div[2]/div/main/section/article/div[1]/div/div/div[4]/div[2]/div/div/p/strong")
            instruction_lists = recipe_page.xpath("///html/body/div[4]/div[2]/div/main/section/article/div[1]/div/div/div[4]/div[2]/div/div/ol")

            ingredient_lists.each do |ingredient_p_tags|
                ingredient_p_tags.xpath("//li/p").each do |ingredient|
                    logger.debug ingredient.content
                end
            end
        end
        # item[:title] = vehicle.css('h2.listing-row__title')&.text&.squish
        # Recipe.where(item).first_or_create
    end

end
