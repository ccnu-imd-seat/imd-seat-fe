const fs = require('fs');
const path = require('path');

// 提取的文本集合，用于去重
const extractedTexts = new Set();

// 文件扫描配置
const fileExtensions = ['.tsx', '.ts'];
const srcDir = path.resolve(__dirname, '../src');

/**
 * 递归扫描目录
 */
function scanDirectory(dir) {
	const files = fs.readdirSync(dir);

	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			scanDirectory(filePath);
		} else if (fileExtensions.some(ext => file.endsWith(ext))) {
			extractTextFromFile(filePath);
		}
	});
}

/**
 * 从文件中提取文本
 */
function extractTextFromFile(filePath) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');

		// 提取中文字符（包括标点符号）
		const chineseRegex = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]+/g;
		const chineseMatches = content.match(chineseRegex) || [];

		// 提取引号内的字符串（双引号和单引号）
		const stringRegex = /['"]([^'"]*?)['\"]/g;
		const stringMatches = [];
		let match;
		while ((match = stringRegex.exec(content)) !== null) {
			const text = match[1];
			// 过滤掉一些不需要的文本（路径、CSS类名、变量名等）
			if (text &&
				!text.includes('/') &&
				!text.includes('_') &&
				!text.includes('.') &&
				!text.includes('#') &&
				!text.includes('px') &&
				!text.includes('%') &&
				!text.includes('rgba') &&
				!text.includes('http') &&
				!text.startsWith('use') &&
				!text.includes('class') &&
				text.length > 0 &&
				text.length < 50) {
				stringMatches.push(text);
			}
		}

		// 提取特定属性的值
		const attributeRegex = /(?:placeholder|title|navigationBarTitleText|text)\s*[:=]\s*['"]([^'"]*?)['"]/g;
		const attributeMatches = [];
		while ((match = attributeRegex.exec(content)) !== null) {
			attributeMatches.push(match[1]);
		}

		// 提取JSX文本内容
		const jsxTextRegex = /<Text[^>]*>([^<]*?)<\/Text>/g;
		const jsxMatches = [];
		while ((match = jsxTextRegex.exec(content)) !== null) {
			const text = match[1].trim();
			if (text && !text.includes('{') && !text.includes('}')) {
				jsxMatches.push(text);
			}
		}

		// 提取Button内的文本
		const buttonTextRegex = /<Button[^>]*>([^<]*?)<\/Button>/g;
		const buttonMatches = [];
		while ((match = buttonTextRegex.exec(content)) !== null) {
			const text = match[1].trim();
			if (text && !text.includes('{') && !text.includes('}')) {
				buttonMatches.push(text);
			}
		}

		// 将所有提取到的文本添加到集合中
		[...chineseMatches, ...stringMatches, ...attributeMatches, ...jsxMatches, ...buttonMatches]
			.forEach(text => {
				if (text && text.trim()) {
					// 对于中文文本，拆分成单个字符
					if (/[\u4e00-\u9fff]/.test(text)) {
						for (const char of text) {
							if (/[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(char)) {
								extractedTexts.add(char);
							}
						}
					}
					// 对于英文文本，保持完整
					extractedTexts.add(text.trim());
				}
			});

		// console.log(`已处理文件: ${path.relative(srcDir, filePath)}`);
	} catch (error) {
		console.error(`处理文件失败 ${filePath}:`, error.message);
	}
}

/**
 * 生成@index.html文件
 */
function generateHtmlFile() {
	// 将集合转换为数组并排序
	const sortedTexts = Array.from(extractedTexts).sort((a, b) => {
		// 中文字符排在前面
		const aIsChinese = /[\u4e00-\u9fff]/.test(a);
		const bIsChinese = /[\u4e00-\u9fff]/.test(b);

		if (aIsChinese && !bIsChinese) return -1;
		if (!aIsChinese && bIsChinese) return 1;

		return a.localeCompare(b);
	});

	// 构建HTML内容
	const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>提取的页面文字 - 字体生成用</title>
		<link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            border-bottom: 2px solid #007acc;
            padding-bottom: 10px;
        }
        .stats {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007acc;
        }
        .text-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 20px;
        }
        .text-item {
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #dee2e6;
            font-size: 14px;
            word-break: break-all;
        }
        .chinese-char {
            display: inline-block;
            margin: 2px;
            padding: 4px 8px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 3px;
            font-size: 16px;
            font-weight: bold;
        }
        .section {
            margin: 30px 0;
        }
        .section h3 {
            color: #495057;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 5px;
        }
        .char-display {
            line-height: 2;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔤 页面文字提取结果</h1>

        <div class="stats">
            <h3>📊 统计信息</h3>
            <p><strong>提取文字总数:</strong> ${sortedTexts.length} 个</p>
            <p><strong>中文字符数:</strong> ${sortedTexts.filter(t => /[\u4e00-\u9fff]/.test(t) && t.length === 1).length} 个</p>
            <p><strong>英文文本数:</strong> ${sortedTexts.filter(t => !/[\u4e00-\u9fff]/.test(t)).length} 个</p>
            <p><strong>生成时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
        </div>

        <div class="section">
            <h3>🈳 中文字符</h3>
            <div class="char-display">
                ${sortedTexts
			.filter(t => /[\u4e00-\u9fff]/.test(t) && t.length === 1)
			.map(char => `<span class="chinese-char">${char}</span>`)
			.join('')}
            </div>
        </div>

        <div class="section">
            <h3>🔤 英文文本</h3>
            <div class="text-grid">
                ${sortedTexts
			.filter(t => !/[\u4e00-\u9fff]/.test(t))
			.map(text => `<div class="text-item">${text}</div>`)
			.join('')}
            </div>
        </div>

        <div class="section">
            <h3>📝 完整文本列表</h3>
            <div class="text-grid">
                ${sortedTexts
			.filter(t => t.length > 1)
			.map(text => `<div class="text-item">${text}</div>`)
			.join('')}
            </div>
        </div>

        <div class="section">
            <h3>💾 纯文本输出（用于字体生成）</h3>
            <textarea readonly style="width: 100%; height: 200px; font-family: monospace; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
${sortedTexts.join('')}
            </textarea>
        </div>
    </div>
</body>
</html>`;

	// 确保temp目录存在
	const tempDir = path.resolve(__dirname, 'temp');
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir, { recursive: true });
	}

	// 复制原始字体文件到temp目录
	const originalFontPath = path.resolve(__dirname, 'temp/AlibabaPuHuiTi-3-65-Medium.ttf');
	const sourceFontPath = path.resolve(__dirname, 'temp/AlibabaPuHuiTi-3-65-Medium.ttf');

	// 如果原始字体文件不存在，输出警告
	if (!fs.existsSync(originalFontPath)) {
		// console.log('⚠️  注意：字体文件 AlibabaPuHuiTi-3-65-Medium.ttf 需要放置在 scripts/temp/ 目录中');
	}

	// 写入文件
	const outputPath = path.resolve(__dirname, 'temp/index.html');
	fs.writeFileSync(outputPath, htmlContent, 'utf8');

	// console.log(`\n✅ 文字提取完成！`);
	// console.log(`📁 输出文件: ${outputPath}`);
	// console.log(`🔢 提取文字总数: ${sortedTexts.length} 个`);
	// console.log(`🈳 中文字符: ${sortedTexts.filter(t => /[\u4e00-\u9fff]/.test(t) && t.length === 1).length} 个`);
	// console.log(`🔤 英文文本: ${sortedTexts.filter(t => !/[\u4e00-\u9fff]/.test(t)).length} 个`);
}

/**
 * 主函数
 */
function main() {
	// console.log('🚀 开始提取页面文字...');
	// console.log(`📂 扫描目录: ${srcDir}`);

	if (!fs.existsSync(srcDir)) {
		console.error(`❌ 源目录不存在: ${srcDir}`);
		return;
	}

	try {
		scanDirectory(srcDir);
		generateHtmlFile();
	} catch (error) {
		console.error('❌ 处理过程中出现错误:', error.message);
	}
}

const { exec } = require('child_process');

// 运行系统命令
function runSystemCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`❌ 命令执行失败: ${error.message}`);
				reject(error);
				return;
			}
			if (stderr) {
				console.warn(`⚠️ 命令警告: ${stderr}`);
			}
			// console.log(`✅ 命令执行成功: ${stdout}`);
			resolve(stdout);
		});
	});
}

// 计算生成字体的 base64 值并更新CSS文件
async function calculateFontBase64() {
	try {
		// console.log('🔍 正在计算字体文件的 base64 值...');

		// 检查生成的字体文件
		const fontFile = 'scripts/temp/AlibabaPuHuiTi-3-65-Medium.ttf';
		const cssFile = path.resolve(__dirname, '../src/app.scss');

		if (fs.existsSync(fontFile)) {
			const fontBuffer = fs.readFileSync(fontFile);
			const base64 = fontBuffer.toString('base64');

			// console.log(`📄 字体文件: ${fontFile}`);
			// console.log(`📊 文件大小: ${(fontBuffer.length / 1024).toFixed(2)} KB`);
			// console.log(`🔢 Base64 长度: ${base64.length} 字符`);
			// console.log(`📝 Base64 前缀: ${base64.substring(0, 50)}...`);

			// 构建 data URI
			const dataUri = `data:font/truetype;charset=utf-8;base64,${base64}`;

			// 读取 CSS 文件
			const cssContent = fs.readFileSync(cssFile, 'utf8');

			// 替换字体 URL
			const updatedCssContent = cssContent.replace(
				/src:\s*url\(['"](.*?)['"]\)\s*format\(['"](.*?)['"]\);/,
				`src: url('${dataUri}') format('truetype');`
			);

			// 写入更新后的 CSS 文件
			fs.writeFileSync(cssFile, updatedCssContent, 'utf8');

			// console.log('🎨 CSS 文件已更新！');
			// console.log(`📄 文件位置: ${cssFile}`);
			// console.log('✅ 字体已成功转换为 base64 内嵌格式！');
		} else {
			console.error(`❌ 字体文件不存在: ${fontFile}`);
		}
	} catch (error) {
		console.error('❌ 计算字体 base64 时出错:', error.message);
	}
}

// 主流程控制函数
async function runFullProcess() {
	try {
		// console.log('🚀 开始完整的字体生成流程...\n');

		// 步骤1: 提取文字并生成HTML
		// console.log('📝 步骤1: 提取页面文字...');
		main();

		// 等待HTML文件生成完成
		await new Promise(resolve => setTimeout(resolve, 1000));

		// 步骤2: 运行font-spider处理字体
		// console.log('\n🕷️ 步骤2: 运行font-spider压缩字体...');
		await runSystemCommand('./node_modules/.bin/font-spider scripts/temp/index.html');

		// 等待font-spider处理完成
		await new Promise(resolve => setTimeout(resolve, 2000));

		// 步骤3: 计算base64并更新CSS
		// console.log('\n🔄 步骤3: 转换字体为base64并更新CSS...');
		await calculateFontBase64();

		// console.log('\n🎉 字体生成流程全部完成！');

	} catch (error) {
		console.error('\n❌ 流程执行失败:', error.message);
	}
}

// 运行完整流程
runFullProcess();
