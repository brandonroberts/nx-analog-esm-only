import * as fs from 'fs';
export function contentPlugin() {
    const cache = new Map();
    return [
        {
            name: 'analogjs-content-frontmatter',
            async transform(code, id) {
                // Transform only the frontmatter into a JSON object for lists
                if (!id.includes('.md?analog-content-list')) {
                    return;
                }
                const cachedContent = cache.get(id);
                // There's no reason to run `readFileSync` and frontmatter parsing if the
                // `transform` hook is called with the same code. In such cases, we can simply
                // return the cached attributes, which is faster than repeatedly reading files
                // synchronously during the build process.
                if (cachedContent?.code === code) {
                    return `export default ${cachedContent.attributes}`;
                }
                const fm = await import('front-matter');
                // The `default` property will be available in CommonJS environment, for instance,
                // when running unit tests. It's safe to retrieve `default` first, since we still
                // fallback to the original implementation.
                const frontmatter = fm.default || fm;
                const fileContents = fs.readFileSync(id.split('?')[0], 'utf8');
                const { attributes } = frontmatter(fileContents);
                const content = {
                    code,
                    attributes: JSON.stringify(attributes),
                };
                cache.set(id, content);
                return `export default ${content.attributes}`;
            },
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS9zcmMvbGliL2NvbnRlbnQtcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBT3pCLE1BQU0sVUFBVSxhQUFhO0lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO0lBRXpDLE9BQU87UUFDTDtZQUNFLElBQUksRUFBRSw4QkFBOEI7WUFDcEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEIsOERBQThEO2dCQUM5RCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO29CQUMzQyxPQUFPO2lCQUNSO2dCQUVELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLHlFQUF5RTtnQkFDekUsOEVBQThFO2dCQUM5RSw4RUFBOEU7Z0JBQzlFLDBDQUEwQztnQkFDMUMsSUFBSSxhQUFhLEVBQUUsSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDaEMsT0FBTyxrQkFBa0IsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNyRDtnQkFFRCxNQUFNLEVBQUUsR0FBUSxNQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDN0Msa0ZBQWtGO2dCQUNsRixpRkFBaUY7Z0JBQ2pGLDJDQUEyQztnQkFDM0MsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0QsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakQsTUFBTSxPQUFPLEdBQUc7b0JBQ2QsSUFBSTtvQkFDSixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7aUJBQ3ZDLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXZCLE9BQU8sa0JBQWtCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoRCxDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9